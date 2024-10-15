import * as React from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Title from "./Title";
import { useUsersQuery } from "@/Redux/featuers/usersApi";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import { Button, CircularProgress } from "@mui/material";
function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

export default function Accuonts() {
  const { data, isSuccess } = useUsersQuery();
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    if (isSuccess) {
      setLoading(false);
    }
  }, [isSuccess]);
  return (
    <React.Fragment>
        {loading ? (
                  <CircularProgress />
                ) : (<>
      <Title>Accuonts</Title>
      <Typography component="p" variant="h4">
        Total : {data?.total}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}></Typography>
      <div>
        <Button>
          <PersonAddAltIcon />
        </Button>
        <Button>
          <PersonSearchIcon />
        </Button>
      </div></>)}
    </React.Fragment>
  );
}
