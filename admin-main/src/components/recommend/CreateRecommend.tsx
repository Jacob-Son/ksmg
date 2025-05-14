"use client";

import { Box, Button, FormHelperText, TextField } from "@mui/material";
import React from "react";
import { MuiFileInput } from "mui-file-input";
import { useForm } from "react-hook-form";
import { API } from "@/service/api";
import useLoadinStore from "@/store/loading";
import useToastStore from "@/store/toast";
import { SketchPicker } from "react-color";

type Inputs = {
  profileImagePath?: File;
  author?: string;
  intro?: string;
  description?: string;
  backgroundColor?: string;
  tokenId?: string;
};

function CreateRecommend({
  setTabIndex,
}: {
  setTabIndex: React.Dispatch<React.SetStateAction<number>>;
}) {
  const { register, handleSubmit, watch, setValue, getValues } =
    useForm<Inputs>();
  const [imagesPreview, setImagesPreview] = React.useState<string>("");

  const { setLoading } = useLoadinStore();
  const { addToast } = useToastStore();

  const handleFileChange = (_file: File | null) => {
    if (_file) {
      if (_file?.size > 5 * 1024 * 1024) {
        addToast({
          message: "파일 크기는 5mb 이하로 올려주세요",
          type: "error",
        });
        return;
      }
      setValue("profileImagePath", _file);
      const preview = URL.createObjectURL(_file);
      setImagesPreview(preview);
    } else {
      setImagesPreview("");
      setValue("profileImagePath", undefined);
    }
  };

  const onSubmit = (data: Inputs) => {
    setLoading(true);
    try {
      const formData = new FormData();

      if (!data?.profileImagePath) {
        addToast({
          message: "이미지를 올려주세요",
          type: "error",
        });
        setLoading(false);
        return;
      }
      if (!data?.author) {
        addToast({
          message: "이름을 적어주세요",
          type: "error",
        });
        setLoading(false);
        return;
      }

      if (!data?.intro) {
        addToast({
          message: "소개를 적어주세요",
          type: "error",
        });
        setLoading(false);
        return;
      }

      if (!data?.description) {
        addToast({
          message: "추천 설명을 적어주세요",
          type: "error",
        });
        setLoading(false);
        return;
      }

      if (!data?.backgroundColor) {
        addToast({
          message: "배경색을 적어주세요",
          type: "error",
        });
        setLoading(false);
        return;
      }

      if (!data?.tokenId) {
        addToast({
          message: "대표 tokenId를 적어주세요",
          type: "error",
        });
        setLoading(false);
        return;
      }

      formData.append("profileImagePath", data.profileImagePath);
      formData.append("author", data.author);
      formData.append("intro", data.intro.slice(0, 50));
      formData.append("description", data.description.slice(0, 100));
      formData.append("backgroundColor", data.backgroundColor);
      formData.append("tokenId", data.tokenId);

      API.Admin.createRecommend(formData)
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
        fullWidth
        id="author"
        label="author"
        type="string"
        {...register("author")}
      />
      <FormHelperText>추천 이유를 적어주세요</FormHelperText>
      <Box sx={{ display: "flex", flexDirection: "row", height: 40 }} />
      <MuiFileInput
        label="profileImagePath"
        value={watch("profileImagePath") || getValues("profileImagePath")}
        onChange={(e) => {
          handleFileChange(e);
        }}
      />
      <FormHelperText>
        상품 이미지입니다. 권장크기는 1x1입니다. 최대 5MB까지 업로드 가능합니다.
      </FormHelperText>
      {imagesPreview && (
        <>
          <img
            src={imagesPreview}
            alt="preview"
            loading="lazy"
            style={{
              width: 50,
              height: 50,
              borderRadius: "50%",
            }}
          />
          <Box sx={{ display: "flex", flexDirection: "row", height: 20 }} />
        </>
      )}
      <Box sx={{ display: "flex", flexDirection: "row", height: 40 }} />
      <TextField
        fullWidth
        id="intro"
        label="intro"
        type="string"
        {...register("intro", { maxLength: 50 })}
        onChange={(e) => {
          if (e.target.value.length > 50) {
            e.target.value = e.target.value.slice(0, 50);
            addToast({
              message: "50자 이하로 입력해주세요",
              type: "error",
            });
          }
        }}
      />
      <FormHelperText>
        추천 상품에 대한 설명을 적어주세요. 최대 50자입니다
      </FormHelperText>
      <Box sx={{ display: "flex", flexDirection: "row", height: 40 }} />
      <TextField
        fullWidth
        id="description"
        label="description"
        type="string"
        {...register("description", { maxLength: 100 })}
        onChange={(e) => {
          if (e.target.value.length > 100) {
            e.target.value = e.target.value.slice(0, 100);
            addToast({
              message: "100자 이하로 입력해주세요",
              type: "error",
            });
          }
        }}
      />
      <FormHelperText>
        추천하는 설명을 적어주세요. 최대 100자입니다
      </FormHelperText>
      <Box sx={{ display: "flex", flexDirection: "row", height: 40 }} />
      <SketchPicker
        color={watch("backgroundColor") || getValues("backgroundColor")}
        onChange={(color) => {
          setValue("backgroundColor", color.hex);
        }}
      />
      <Box sx={{ display: "flex", flexDirection: "row", height: 40 }} />
      <TextField
        fullWidth
        id="backgroundColor"
        type="string"
        {...register("backgroundColor")}
      />
      <FormHelperText>
        원하는 배경색 값을 찾아서 적어주세요. ex) #717171
      </FormHelperText>
      <Box sx={{ display: "flex", flexDirection: "row", height: 40 }} />
      <TextField
        fullWidth
        id="tokenId"
        label="tokenId"
        type="string"
        {...register("tokenId")}
      />
      <FormHelperText>
        추천하는 상품의 대표 tokenId(#1번)를 적어주세요. 상품을 생성후에
        상세페이지를 들어가서 주소창에 store뒤에 있는 숫자인 tokenId를 복사해서
        붙여넣어주세요
      </FormHelperText>
      <Box sx={{ display: "flex", flexDirection: "row", height: 40 }} />
      <Button variant="contained" onClick={handleSubmit(onSubmit)}>
        Create
      </Button>
    </div>
  );
}

export default CreateRecommend;
