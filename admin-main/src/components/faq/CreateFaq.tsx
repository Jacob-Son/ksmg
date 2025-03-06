"use client";

import { Box, Button, TextField, TextareaAutosize } from "@mui/material";
import React from "react";
import { API } from "@/service/api";
import useLoadinStore from "@/store/loading";
import useToastStore from "@/store/toast";

function CreateFaq({
  setTabIndex,
}: {
  setTabIndex: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [title, setTitle] = React.useState<string>("");
  const [content, setContent] = React.useState<string>("");
  const { setLoading } = useLoadinStore();
  const { addToast } = useToastStore();

  const onSubmit = () => {
    setLoading(true);
    try {
      if (!title) {
        addToast({
          message: "제목을 입력해주세요",
          type: "error",
        });
        setLoading(false);
        return;
      }
      if (!content) {
        addToast({
          message: "설명을 입력해주세요",
          type: "error",
        });
        setLoading(false);
        return;
      }

      API.Faq.createFaq(title, content)
        .then((res) => {
          setLoading(false);
          addToast({
            message: "Success",
            type: "success",
          });
          setTabIndex(1);
        })
        .catch((e) => {
          addToast({
            message: JSON.stringify(e),
            type: "error",
          });
          setLoading(false);
          console.log(e);
        });
    } catch (e) {
      addToast({
        message: "Fail",
        type: "error",
      });
      setLoading(false);
      console.log(e);
    }
  };

  return (
    <div>
      <TextField
        id="tile"
        label="Title"
        variant="outlined"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Box sx={{ display: "flex", flexDirection: "row", height: 40 }} />
      <TextareaAutosize
        minRows={4}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        style={{
          width: "1500px",
          resize: "none",
          overflow: "auto",
          padding: "10px",
        }}
      />
      <Box sx={{ display: "flex", flexDirection: "row", height: 40 }} />
      <Button variant="contained" onClick={onSubmit}>
        Create
      </Button>
    </div>
  );
}

export default CreateFaq;
