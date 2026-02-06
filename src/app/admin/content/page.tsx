/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  TextField,
  Grid,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  Alert,
  Snackbar,
  Tabs,
  Tab,
  Chip
} from '@mui/material';
import { FaEdit, FaTrash, FaPlus, FaSave, FaCopy, FaGithub } from 'react-icons/fa';
import * as initialContent from '@/data/content';
import type { ImpactLevel, MissionItem, TeamMember, Trainer } from '@/types';

interface ContentData {
  impactLevels: ImpactLevel[];
  missionItems: MissionItem[];
  teamData: TeamMember[];
  trainerData: Trainer[];
  navLinks: Array<{ name: string; target: string }>;
  legalLinks: Array<{ name: string; href: string }>;
  navItems: Array<{ label: string; target: string }>;
  ecosystem: Array<{
    title: string;
    role: string;
    iconKey: string;
    logo: string | null;
    desc: string;
  }>;
  partners: Array<{ name: string; color: string }>;
  steps: Array<{
    id: string;
    title: string;
    iconKey: string;
    text: string;
    highlight: string;
  }>;
}

export default function ContentEditor() {
  const [contentData, setContentData] = useState<ContentData>({
    impactLevels: initialContent.impactLevels,
    missionItems: initialContent.missionItems,
    teamData: initialContent.teamData,
    trainerData: initialContent.trainerData,
    navLinks: initialContent.navLinks,
    legalLinks: initialContent.legalLinks,
    navItems: initialContent.navItems,
    ecosystem: initialContent.ecosystem,
    partners: initialContent.partners,
    steps: initialContent.steps,
  });

  const [activeTab, setActiveTab] = useState(0);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<any>(null);
  const [currentSection, setCurrentSection] = useState<keyof ContentData>('impactLevels');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleEdit = (section: keyof ContentData, item: any) => {
    setCurrentSection(section);
    setCurrentItem({ ...item });
    setEditDialogOpen(true);
  };

  const handleAdd = (section: keyof ContentData) => {
    setCurrentSection(section);
    
    // Create empty template based on section
    const templates: Record<keyof ContentData, any> = {
      impactLevels: { value: 0, label: '', text: '' },
      missionItems: { iconKey: '', title: '', description: '' },
      teamData: { id: '', name: '', role: '', image: null, tags: [], bio: '' },
      trainerData: { id: '', name: '', sport: '', role: '', image: null, bio: '', tags: [] },
      navLinks: { name: '', target: '' },
      legalLinks: { name: '', href: '' },
      navItems: { label: '', target: '' },
      ecosystem: { title: '', role: '', iconKey: '', logo: null, desc: '' },
      partners: { name: '', color: '#000000' },
      steps: { id: '', title: '', iconKey: '', text: '', highlight: '' },
    };
    
    setCurrentItem(templates[section]);
    setEditDialogOpen(true);
  };

  const handleDelete = (section: keyof ContentData, index: number) => {
    if (confirm('Do you really want to delete this item?')) {
      setContentData({
        ...contentData,
        [section]: (contentData[section] as any[]).filter((_, i) => i !== index)
      });
      setSnackbarMessage('Item deleted');
      setSnackbarOpen(true);
    }
  };

  const handleSave = () => {
    if (!currentItem) return;

    const sectionArray = [...(contentData[currentSection] as any[])];
    
    // Find by ID for sections that have IDs
    const idKey = currentSection === 'teamData' || currentSection === 'trainerData' || currentSection === 'steps' 
      ? 'id' 
      : currentSection === 'impactLevels' 
      ? 'value' 
      : null;

    if (idKey && currentItem[idKey]) {
      const index = sectionArray.findIndex(item => item[idKey] === currentItem[idKey]);
      if (index >= 0) {
        sectionArray[index] = currentItem;
      } else {
        sectionArray.push(currentItem);
      }
    } else {
      // For items without IDs, just add them
      sectionArray.push(currentItem);
    }

    setContentData({
      ...contentData,
      [currentSection]: sectionArray
    });

    setEditDialogOpen(false);
    setSnackbarMessage('Item saved');
    setSnackbarOpen(true);
  };

  const generateTypeScriptFile = () => {
    const lines: string[] = [
      `import { ImpactLevel, MissionItem, TeamMember, Trainer } from "@/types";`,
      '',
      `export const impactLevels: ImpactLevel[] = ${JSON.stringify(contentData.impactLevels, null, 2)};`,
      '',
      `export const missionItems: MissionItem[] = ${JSON.stringify(contentData.missionItems, null, 2)};`,
      '',
      `export const teamData: TeamMember[] = ${JSON.stringify(contentData.teamData, null, 2)};`,
      '',
      `export const navLinks = ${JSON.stringify(contentData.navLinks, null, 2)};`,
      '',
      `export const legalLinks = ${JSON.stringify(contentData.legalLinks, null, 2)};`,
      '',
      `export const navItems = ${JSON.stringify(contentData.navItems, null, 2)};`,
      '',
      `export const ecosystem = ${JSON.stringify(contentData.ecosystem, null, 2)};`,
      '',
      `export const partners = ${JSON.stringify(contentData.partners, null, 2)};`,
      '',
      `export const steps = ${JSON.stringify(contentData.steps, null, 2)};`,
      '',
      '',
      `export const trainerData: Trainer[] = ${JSON.stringify(contentData.trainerData, null, 2)};`,
    ];
    
    return lines.join('\n');
  };

  const handleCopyToClipboard = () => {
    const tsContent = generateTypeScriptFile();
    navigator.clipboard.writeText(tsContent);
    setSnackbarMessage('TypeScript file content copied to clipboard!');
    setSnackbarOpen(true);
  };

  const handleSaveFile = () => {
    const tsContent = generateTypeScriptFile();
    const blob = new Blob([tsContent], { type: 'text/typescript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'content.ts';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setSnackbarMessage('TypeScript file downloaded!');
    setSnackbarOpen(true);
  };

  const handleOpenGitHub = () => {
    const tsContent = generateTypeScriptFile();
    navigator.clipboard.writeText(tsContent);
    
    const repoOwner = 'YeonV';
    const repoName = 'talent-kids-foundation';
    const filePath = 'src/data/content.ts';
    const githubUrl = `https://github.com/${repoOwner}/${repoName}/edit/main/${filePath}`;
    
    setSnackbarMessage('TypeScript copied to clipboard! Opening GitHub...');
    setSnackbarOpen(true);
    
    setTimeout(() => {
      window.open(githubUrl, '_blank');
    }, 1000);
  };

  const renderSectionCards = (section: keyof ContentData) => {
    const items = contentData[section] as any[];
    
    return (
      <Grid container spacing={3}>
        {items.map((item, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
            <Card>
              <CardContent>
                <Typography variant="h6" fontWeight={700} gutterBottom>
                  {item.name || item.title || item.label || item.text || 'Item ' + (index + 1)}
                </Typography>
                {item.role && (
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {item.role}
                  </Typography>
                )}
                {item.description && (
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {item.description.substring(0, 100)}...
                  </Typography>
                )}
                {item.tags && item.tags.length > 0 && (
                  <Stack direction="row" spacing={0.5} flexWrap="wrap" mt={1}>
                    {item.tags.map((tag: string, i: number) => (
                      <Chip key={i} label={tag} size="small" />
                    ))}
                  </Stack>
                )}
                <Stack direction="row" spacing={1} mt={2}>
                  <IconButton
                    size="small"
                    color="primary"
                    onClick={() => handleEdit(section, item)}
                  >
                    <FaEdit />
                  </IconButton>
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => handleDelete(section, index)}
                  >
                    <FaTrash />
                  </IconButton>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Card 
            sx={{ 
              height: '100%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              minHeight: 200,
              cursor: 'pointer',
              '&:hover': { bgcolor: 'action.hover' }
            }}
            onClick={() => handleAdd(section)}
          >
            <CardContent>
              <Stack alignItems="center" spacing={2}>
                <FaPlus size={32} />
                <Typography variant="h6">Add New</Typography>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  };

  const renderEditForm = () => {
    if (!currentItem) return null;

    switch (currentSection) {
      case 'impactLevels':
        return (
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                type="number"
                label="Value (€)"
                value={currentItem.value}
                onChange={(e) => setCurrentItem({ ...currentItem, value: Number(e.target.value) })}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Label"
                value={currentItem.label}
                onChange={(e) => setCurrentItem({ ...currentItem, label: e.target.value })}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Text"
                value={currentItem.text}
                onChange={(e) => setCurrentItem({ ...currentItem, text: e.target.value })}
              />
            </Grid>
          </Grid>
        );

      case 'missionItems':
        return (
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Icon Key"
                value={currentItem.iconKey}
                onChange={(e) => setCurrentItem({ ...currentItem, iconKey: e.target.value })}
                helperText="e.g., child, heart, medal"
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Title"
                value={currentItem.title}
                onChange={(e) => setCurrentItem({ ...currentItem, title: e.target.value })}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Description"
                value={currentItem.description}
                onChange={(e) => setCurrentItem({ ...currentItem, description: e.target.value })}
              />
            </Grid>
          </Grid>
        );

      case 'teamData':
      case 'trainerData':
        return (
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="ID"
                value={currentItem.id}
                onChange={(e) => setCurrentItem({ ...currentItem, id: e.target.value })}
                required
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Name"
                value={currentItem.name}
                onChange={(e) => setCurrentItem({ ...currentItem, name: e.target.value })}
                required
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label={currentSection === 'trainerData' ? 'Sport' : 'Role'}
                value={currentSection === 'trainerData' ? currentItem.sport : currentItem.role}
                onChange={(e) => setCurrentItem({ 
                  ...currentItem, 
                  [currentSection === 'trainerData' ? 'sport' : 'role']: e.target.value 
                })}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Role"
                value={currentItem.role}
                onChange={(e) => setCurrentItem({ ...currentItem, role: e.target.value })}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Image URL"
                value={currentItem.image || ''}
                onChange={(e) => setCurrentItem({ ...currentItem, image: e.target.value || null })}
                helperText={currentSection === 'teamData' ? "e.g., /img/team/BennyBehrla.jpg or leave empty" : "e.g., /img/trainers/LucasHeerde.jpg or leave empty"}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Tags (comma-separated)"
                value={currentItem.tags?.join(', ') || ''}
                onChange={(e) => setCurrentItem({ 
                  ...currentItem, 
                  tags: e.target.value.split(',').map((t: string) => t.trim()).filter(Boolean)
                })}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Bio"
                value={currentItem.bio}
                onChange={(e) => setCurrentItem({ ...currentItem, bio: e.target.value })}
              />
            </Grid>
          </Grid>
        );

      case 'navLinks':
      case 'navItems':
        return (
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label={currentSection === 'navLinks' ? 'Name' : 'Label'}
                value={currentSection === 'navLinks' ? currentItem.name : currentItem.label}
                onChange={(e) => setCurrentItem({ 
                  ...currentItem, 
                  [currentSection === 'navLinks' ? 'name' : 'label']: e.target.value 
                })}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Target"
                value={currentItem.target}
                onChange={(e) => setCurrentItem({ ...currentItem, target: e.target.value })}
                helperText="e.g., mission, team, donate"
              />
            </Grid>
          </Grid>
        );

      case 'legalLinks':
        return (
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Name"
                value={currentItem.name}
                onChange={(e) => setCurrentItem({ ...currentItem, name: e.target.value })}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Href"
                value={currentItem.href}
                onChange={(e) => setCurrentItem({ ...currentItem, href: e.target.value })}
                helperText="e.g., /impressum"
              />
            </Grid>
          </Grid>
        );

      case 'ecosystem':
        return (
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Title"
                value={currentItem.title}
                onChange={(e) => setCurrentItem({ ...currentItem, title: e.target.value })}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Role"
                value={currentItem.role}
                onChange={(e) => setCurrentItem({ ...currentItem, role: e.target.value })}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Icon Key"
                value={currentItem.iconKey}
                onChange={(e) => setCurrentItem({ ...currentItem, iconKey: e.target.value })}
                helperText="e.g., building, users, graduation-cap"
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Logo URL"
                value={currentItem.logo || ''}
                onChange={(e) => setCurrentItem({ ...currentItem, logo: e.target.value || null })}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Description"
                value={currentItem.desc}
                onChange={(e) => setCurrentItem({ ...currentItem, desc: e.target.value })}
              />
            </Grid>
          </Grid>
        );

      case 'partners':
        return (
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Name"
                value={currentItem.name}
                onChange={(e) => setCurrentItem({ ...currentItem, name: e.target.value })}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                type="color"
                label="Color"
                value={currentItem.color}
                onChange={(e) => setCurrentItem({ ...currentItem, color: e.target.value })}
              />
            </Grid>
          </Grid>
        );

      case 'steps':
        return (
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="ID"
                value={currentItem.id}
                onChange={(e) => setCurrentItem({ ...currentItem, id: e.target.value })}
                helperText="e.g., 01, 02, 03"
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Title"
                value={currentItem.title}
                onChange={(e) => setCurrentItem({ ...currentItem, title: e.target.value })}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Icon Key"
                value={currentItem.iconKey}
                onChange={(e) => setCurrentItem({ ...currentItem, iconKey: e.target.value })}
                helperText="e.g., truck, ninja, trophy"
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Text"
                value={currentItem.text}
                onChange={(e) => setCurrentItem({ ...currentItem, text: e.target.value })}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Highlight"
                value={currentItem.highlight}
                onChange={(e) => setCurrentItem({ ...currentItem, highlight: e.target.value })}
              />
            </Grid>
          </Grid>
        );

      default:
        return null;
    }
  };

  const sections: Array<{ key: keyof ContentData; label: string }> = [
    { key: 'impactLevels', label: 'Impact Levels' },
    { key: 'missionItems', label: 'Mission' },
    { key: 'teamData', label: 'Team' },
    { key: 'trainerData', label: 'Trainers' },
    { key: 'steps', label: 'Program Steps' },
    { key: 'ecosystem', label: 'Ecosystem' },
    { key: 'partners', label: 'Partners' },
    { key: 'navLinks', label: 'Nav Links' },
    { key: 'navItems', label: 'Nav Items' },
    { key: 'legalLinks', label: 'Legal Links' },
  ];

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h3" fontWeight={700}>
          Content Editor
        </Typography>
        <Stack direction="row" spacing={2}>
          <Button
            variant="outlined"
            startIcon={<FaCopy />}
            onClick={handleCopyToClipboard}
          >
            Copy TS
          </Button>
          <Button
            variant="outlined"
            startIcon={<FaSave />}
            onClick={handleSaveFile}
          >
            Save TS
          </Button>
          <Button
            variant="outlined"
            startIcon={<FaGithub />}
            onClick={handleOpenGitHub}
          >
            Open in GitHub
          </Button>
        </Stack>
      </Box>

      <Alert severity="info" sx={{ mb: 3 }}>
        Changes are stored in browser. Click &quot;Copy TS&quot; to copy to clipboard, &quot;Save TS&quot; to download the file, or &quot;Open in GitHub&quot; to edit directly on GitHub.
      </Alert>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs 
          value={activeTab} 
          onChange={(_, newValue) => setActiveTab(newValue)}
          variant="scrollable"
          scrollButtons="auto"
        >
          {sections.map((section) => (
            <Tab 
              key={section.key} 
              label={`${section.label} (${(contentData[section.key] as any[]).length})`}
            />
          ))}
        </Tabs>
      </Box>

      <Box>
        {sections.map((section, index) => (
          <Box key={section.key} hidden={activeTab !== index}>
            {activeTab === index && renderSectionCards(section.key)}
          </Box>
        ))}
      </Box>

      {/* Edit Dialog */}
      <Dialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Edit {sections.find(s => s.key === currentSection)?.label}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            {renderEditForm()}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>
            Cancel
          </Button>
          <Button
            variant="contained"
            startIcon={<FaSave />}
            onClick={handleSave}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
    </Container>
  );
}
