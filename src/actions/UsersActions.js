import { Box, Tooltip, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const UsersActions = ({ params }) => {
  return (
    <Box>
      <Tooltip title="Edit User">
        <IconButton onClick={() => {}}>
          <EditIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Edit Company">
        <IconButton onClick={() => {}}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default UsersActions;
