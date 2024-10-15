"use client";
import { UseAppSelector } from "@/Redux/store";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import { Suspense, forwardRef, useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Modal,
  Palette,
  PaletteMode,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { getUserLocalStorge } from "@/data/local/webData";
import {
  useGetPostByIDQuery,
  useGetPostCommentsQuery,
} from "@/Redux/featuers/postApi";
const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function page({ params }: any) {
  const [loading, setLoading] = useState(true);
  const settings: any = UseAppSelector((state: any) => state.settings.value);

  const [post, setPost] = useState({
    id: 0,
    title: "",
    body: "",
    userId: 0,
    tags: [""],
    reactions: 0,
  });

  const [comments, setComments] = useState({
    comments: [
      {
        id: 0,
        body: "",
        postId: 0,
        user: {
          id: 0,
          username: "",
        },
      },
    ],
    total: 0,
    skip: 0,
    limit: 0,
  });

  const {
    data: postData,
    isLoading: isAppsLoading,
    isUninitialized: isAppsUninitialized,
    isSuccess: isAppsSuccess,
    isError: isAppError,
    error: appError,
  } = useGetPostByIDQuery(params.id);
  const {
    data: commentData,
    isLoading: isCommentLoading,
    isUninitialized: isCommentUninitialized,
    isSuccess: isCommentSuccess,
    isError: isCommentError,
    error: CommentError,
  } = useGetPostCommentsQuery(params.id);

  useEffect(() => {
    if (isAppsSuccess) {
      setPost({
        id: postData.id,
        title: postData.title,
        body: postData.body,
        userId: postData.userId,
        tags: postData.tags,
        reactions: postData.reactions,
      });
      if (isCommentSuccess) {
        setComments(commentData);
      }

      setLoading(false);
    }
  }, [isAppsSuccess, isCommentSuccess]);

  return (
    <>
      <CssBaseline />

      <Card
        sx={{
          marginTop: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: " #dad7cd",
          maxWidth: 700,
          height: "auto",
          align: "center",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <CardContent
          sx={{
            marginTop: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            align: "center",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          {loading ? (
            <CircularProgress color="inherit" />
          ) : (
            <>
              <Suspense fallback={<p>...loading</p>}>
                <Typography
                  sx={{ marginTop: 2, fontSize: 26, fontWeight: 700 }}
                >
                  {post.title}
                </Typography>

                <Typography
                  sx={{
                    marginTop: 0.5,
                    marginLeft: "-69%",
                    fontSize: 18,
                    fontWeight: 400,
                  }}
                >
                  UserId:{" "}
                  <Button
                    sx={{ fontSize: 18, fontWeight: 400 }}
                    href={"/user/" + `${post.userId}`}
                  >
                    {post.userId}
                  </Button>
                </Typography>

                <Typography
                  sx={{
                    marginTop: 0.5,
                    fontSize: 18,
                    marginLeft: "-44%",
                    fontWeight: 400,
                  }}
                >
                  Tags:{post.tags.map((tag) => " (" + tag + ") ")}
                </Typography>

                <Typography
                  sx={{
                    marginTop: 1,
                    marginLeft: "-58%",
                    fontSize: 18,
                    fontWeight: 400,
                  }}
                >
                  Number of Reactions: {post.reactions}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  href={"/post/updatePost/" + `${post.id}`}
                  sx={{ marginLeft: 60, marginTop: 2 }}
                >
                  Edit <EditIcon />
                </Button>
                <Typography
                  sx={{
                    marginTop: 3,
                    fontSize: 26,
                    fontWeight: 400,
                    border: 2,
                    borderColor: "black",
                  }}
                >
                  {post.body}
                </Typography>
                {comments.comments.map((comment) => (
                  <Box
                    key={comment.id}
                    sx={{
                      width: "100%",
                      marginTop: 3,
                      fontSize: 26,
                      fontWeight: 400,
                      border: 1,
                      borderColor: "black",
                      borderRadius: 3,
                    }}
                  >
                    <Typography
                      sx={{ marginTop: 2, fontSize: 26, fontWeight: 600 }}
                    >
                      <Button
                        sx={{ fontSize: 26, fontWeight: 400 }}
                        href={"/user/" + `${comment.user.id}`}
                      >
                        {comment.user.username}
                      </Button>
                    </Typography>
                    <Typography
                      sx={{ marginTop: 2, fontSize: 20, fontWeight: 200 }}
                    >
                      {comment.body}
                    </Typography>
                  </Box>
                ))}
              </Suspense>
            </>
          )}
        </CardContent>
      </Card>
      </>
      );
}
