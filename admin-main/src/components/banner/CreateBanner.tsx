"use client";

import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect } from "react";
import { MuiFileInput } from "mui-file-input";
import { useForm } from "react-hook-form";
import { API } from "@/service/api";
import useLoadinStore from "@/store/loading";
import useToastStore from "@/store/toast";

type Inputs = {
  image?: File;
  mobileImage?: File;
  link?: string;
  linkType?: string;
};

function CreateBanner({
  setTabIndex,
}: {
  setTabIndex: React.Dispatch<React.SetStateAction<number>>;
}) {
  const { register, handleSubmit, watch, setValue, getValues } =
    useForm<Inputs>();
  const [imagesPreview, setImagesPreview] = React.useState<string>("");
  const [mobileImagePreview, setMobileImagePreview] =
    React.useState<string>("");
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
      setValue("image", _file);
      const preview = URL.createObjectURL(_file);
      setImagesPreview(preview);
    } else {
      setImagesPreview("");
      setValue("image", undefined);
    }
  };

  const handleMobileFileChange = (_file: File | null) => {
    if (_file) {
      if (_file?.size > 5 * 1024 * 1024) {
        addToast({
          message: "파일 크기는 5mb 이하로 올려주세요",
          type: "error",
        });
        return;
      }
      setValue("mobileImage", _file);
      setMobileImagePreview(URL.createObjectURL(_file));
    } else {
      setMobileImagePreview("");
      setValue("mobileImage", undefined);
    }
  };

  const onSubmit = (data: Inputs) => {
    setLoading(true);
    try {
      const formData = new FormData();

      if (!data?.image) {
        addToast({
          message: "이미지를 올려주세요",
          type: "error",
        });
        setLoading(false);
        return;
      }
      if (!data?.mobileImage) {
        addToast({
          message: "모바일 이미지를 올려주세요",
          type: "error",
        });
        setLoading(false);
        return;
      }

      formData.append("image", data.image);
      formData.append("mobileImage", data.mobileImage);
      formData.append("link", data.link || "");

      API.Admin.createBanner(formData).then((res) => {
        setLoading(false);
        addToast({
          message: "Success",
          type: "success",
        });
        setTabIndex(1);
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
        id="link"
        label="Link"
        placeholder="ex) https://www.google.com"
        type="string"
        {...register("link")}
        disabled={watch("linkType") === ""}
      />
      <FormHelperText>링크가 있을시 등록해주세요</FormHelperText>
      <Box sx={{ display: "flex", flexDirection: "row", height: 40 }} />
      <MuiFileInput
        label="image"
        value={watch("image") || getValues("image")}
        onChange={(e) => {
          handleFileChange(e);
        }}
      />
      <FormHelperText>
        PC 이미지입니다. 1629x678 비율로 맞춰주세요. 최대 5MB까지 업로드
        가능합니다.
      </FormHelperText>
      {imagesPreview && (
        <>
          <img src={imagesPreview} alt="preview" loading="lazy" />
          <Box sx={{ display: "flex", flexDirection: "row", height: 20 }} />
        </>
      )}
      <Box sx={{ display: "flex", flexDirection: "row", height: 40 }} />
      <MuiFileInput
        label="mobile image"
        value={watch("mobileImage") || getValues("mobileImage")}
        onChange={(e) => {
          handleMobileFileChange(e);
        }}
      />
      <FormHelperText>
        모바일 이미지입니다. 488x638 비율로 맞춰주세요. 최대 5MB까지 업로드
        가능합니다.
      </FormHelperText>
      {mobileImagePreview && (
        <>
          <img src={mobileImagePreview} alt="preview" loading="lazy" />
          <Box sx={{ display: "flex", flexDirection: "row", height: 20 }} />
        </>
      )}
      <Box sx={{ display: "flex", flexDirection: "row", height: 20 }} />
      <Button variant="contained" onClick={handleSubmit(onSubmit)}>
        Create
      </Button>
    </div>
  );
}

export default CreateBanner;
