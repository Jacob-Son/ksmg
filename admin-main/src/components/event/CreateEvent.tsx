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
import { DateTimePicker } from "@mui/x-date-pickers";
import React, { useEffect } from "react";
import { MuiFileInput } from "mui-file-input";
import { useForm } from "react-hook-form";
import { API } from "@/service/api";
import useLoadinStore from "@/store/loading";
import useToastStore from "@/store/toast";
import { EventType } from "@/type/event";

type Inputs = {
  title?: string;
  description?: string;
  externalUrl?: string;
  startDay?: Date;
  endDay?: Date;
  image?: File;
  detailImage?: File;
  eventType?: EventType;
};

function CreateEvent({
  setTabIndex,
}: {
  setTabIndex: React.Dispatch<React.SetStateAction<number>>;
}) {
  const { register, handleSubmit, watch, setValue, getValues } =
    useForm<Inputs>();
  const [imagesPreview, setImagesPreview] = React.useState<string>("");
  const [detailImagePreview, setDetailImagePreview] =
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

  const handleDetailFileChange = (_file: File | null) => {
    if (_file) {
      if (_file?.size > 5 * 1024 * 1024) {
        addToast({
          message: "파일 크기는 5mb 이하로 올려주세요",
          type: "error",
        });
        return;
      }
      setValue("detailImage", _file);
      setDetailImagePreview(URL.createObjectURL(_file));
    } else {
      setDetailImagePreview("");
      setValue("detailImage", undefined);
    }
  };

  const onSubmit = (data: Inputs) => {
    setLoading(true);
    try {
      const formData = new FormData();

      if (!data?.title) {
        addToast({
          message: "제목을 입력해주세요",
          type: "error",
        });
        setLoading(false);
        return;
      }
      if (!data?.description) {
        addToast({
          message: "설명을 입력해주세요",
          type: "error",
        });
        setLoading(false);
        return;
      }
      if (!data?.startDay) {
        addToast({
          message: "시작 시간을 입력해주세요",
          type: "error",
        });
        setLoading(false);
        return;
      }
      if (!data?.endDay) {
        addToast({
          message: "종료 시간을 입력해주세요",
          type: "error",
        });
        setLoading(false);
        return;
      }

      if (!data.eventType) {
        addToast({
          message: "이벤트 종류를 선택해주세요",
          type: "error",
        });
        setLoading(false);
        return;
      }

      if (!data?.image) {
        addToast({
          message: "이미지를 올려주세요",
          type: "error",
        });
        setLoading(false);
        return;
      }

      if (!data?.detailImage) {
        addToast({
          message: "상세 이미지를 올려주세요",
          type: "error",
        });
        setLoading(false);
        return;
      }

      formData.append("title", data.title);
      formData.append("description", data.description);
      if (data.externalUrl) {
        formData.append("externalUrl", data.externalUrl);
      }
      formData.append("eventType", data.eventType as any);
      formData.append("startDay", new Date(data.startDay).toISOString() as any);
      formData.append("endDay", new Date(data.endDay).toISOString() as any);
      formData.append("detailImage", data.detailImage);
      formData.append("image", data.image);

      API.Event.createEvent(formData)
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
        {...register("title")}
      />
      <Box sx={{ display: "flex", flexDirection: "row", height: 40 }} />
      <TextField
        fullWidth
        id="description"
        label="Description"
        variant="outlined"
        {...register("description")}
      />
      <Box sx={{ display: "flex", flexDirection: "row", height: 40 }} />
      <TextField
        fullWidth
        id="externalUrl"
        label="externalUrl"
        type="string"
        {...register("externalUrl")}
      />
      <FormHelperText>
        이벤트 관련 외부 링크가 있을시 등록해주세요
      </FormHelperText>
      <Box sx={{ display: "flex", flexDirection: "row", height: 40 }} />
      <FormControl fullWidth>
        <InputLabel id="eventType">이벤트 종류</InputLabel>
        <Select
          labelId="eventType"
          id="eventType"
          value={watch("eventType") || getValues("eventType")}
          label="Event Type"
          {...register("eventType")}
        >
          <MenuItem value={EventType.EVENT}>이벤트</MenuItem>
          <MenuItem value={EventType.CULTURE}>문화행사</MenuItem>
        </Select>
      </FormControl>
      <Box sx={{ display: "flex", flexDirection: "row", height: 40 }} />
      <DateTimePicker
        label="Start Day"
        value={watch("startDay") || getValues("startDay")}
        onChange={(e) => {
          if (e === null) return;
          setValue("startDay", e);
        }}
      />
      <Box sx={{ display: "flex", flexDirection: "row", height: 40 }} />
      <DateTimePicker
        label="end Day"
        value={watch("endDay") || getValues("endDay")}
        onChange={(e) => {
          if (e === null) return;
          setValue("endDay", e);
        }}
      />
      <Box sx={{ display: "flex", flexDirection: "row", height: 40 }} />
      <MuiFileInput
        label="image"
        value={watch("image") || getValues("image")}
        onChange={(e) => {
          handleFileChange(e);
        }}
      />
      <FormHelperText>
        썸네일 이미지입니다. 권장 크기는 818x818입니다. 최대 5MB까지 업로드
        가능합니다.
      </FormHelperText>
      <Box sx={{ display: "flex", flexDirection: "row", height: 20 }} />
      {imagesPreview && (
        <>
          <img src={imagesPreview} alt="preview" loading="lazy" />
          <Box sx={{ display: "flex", flexDirection: "row", height: 20 }} />
        </>
      )}
      <MuiFileInput
        label="detail images"
        value={watch("detailImage") || getValues("detailImage")}
        onChange={(e) => {
          handleDetailFileChange(e);
        }}
      />
      <FormHelperText>
        상세 이미지입니다. 세로로 긴 이미지를 올려주세요. 최대 5MB까지 업로드
        가능합니다.
      </FormHelperText>
      <Box sx={{ display: "flex", flexDirection: "row", height: 20 }} />
      {detailImagePreview && (
        <>
          <img src={detailImagePreview} alt="preview" loading="lazy" />
          <Box sx={{ display: "flex", flexDirection: "row", height: 20 }} />
        </>
      )}
      <Button variant="contained" onClick={handleSubmit(onSubmit)}>
        Create
      </Button>
    </div>
  );
}

export default CreateEvent;
