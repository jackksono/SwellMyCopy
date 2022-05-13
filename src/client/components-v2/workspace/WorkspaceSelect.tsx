import React from "react";
import FileDownloadRoundedIcon from '@mui/icons-material/FileDownloadRounded';
import ImportWorkspaceModal from "./modals/import-workspace/ImportWorkspaceModal"
import { Box, Select, MenuItem, FormControl, FormHelperText } from '@mui/material';
import { useSelector } from 'react-redux';

export default function WorkspaceSelect({ currentWorkspaceId, handleWorkspaceChange }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // TODO: change store explicit any to a more defined type
  const collections = useSelector((store: any) => store.business.collections);
  const menuItems = [];
  for (let workspace of collections) {
    menuItems.push(<MenuItem key={workspace.id} value={workspace.id}>{workspace.name}</MenuItem>)
  }

  return (
    <Box sx={{mr: 1, flexGrow: 1}}>
      <FormControl
        fullWidth
        variant="standard">
        <Select
          id="workspace-select"
          label="workspace"
          value={currentWorkspaceId}
          onChange={handleWorkspaceChange}
        >
          {menuItems}
          <MenuItem value="" onClick={handleOpen}><FileDownloadRoundedIcon /></MenuItem>
        </Select>
        <FormHelperText>Current Workspace</FormHelperText>
      </FormControl>
      <ImportWorkspaceModal open={open} handleClose={handleClose}/>
    </Box>
  )
}
