"use client";

import {
  Box,
  Button,
  FormHelperText,
  ImageList,
  ImageListItem,
  TextField,
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import React, { useEffect } from "react";
import { MuiFileInput } from "mui-file-input";
import { useForm } from "react-hook-form";
import { API } from "@/service/api";
import useLoadinStore from "@/store/loading";
import useToastStore from "@/store/toast";

type Inputs = {
  name?: string;
  description?: string;
  startPrice?: number;
  estimatedPrice?: number;
  startTime?: Date;
  endTime?: Date;
  images?: File[];
  detailImage?: File;
};

function CreateAuction({
  setTabIndex,
}: {
  setTabIndex: React.Dispatch<React.SetStateAction<number>>;
}) {
  const { register, handleSubmit, watch, setValue, getValues } =
    useForm<Inputs>();
  const [imagesPreview, setImagesPreview] = React.useState<string[]>([]);
  const [detailImagePreview, setDetailImagePreview] =
    React.useState<string>("");
  const { setLoading } = useLoadinStore();
  const { addToast } = useToastStore();

  const handleFileChange = (_fies: File[]) => {
    if (_fies.length > 5) {
      addToast({
        message: "5개 이하의 이미지를 올려주세요",
        type: "error",
      });
      return;
    }
    if (_fies.some((file) => file.size > 5 * 1024 * 1024)) {
      addToast({
        message: "파일 크기는 5mb 이하로 올려주세요",
        type: "error",
      });
      return;
    }
    if (_fies) {
      setValue("images", _fies);
      const _images = _fies.map((file) => URL.createObjectURL(file));
      setImagesPreview(_images);
    } else {
      setImagesPreview([]);
      setValue("images", undefined);
    }
  };

  const handleDetailFileChange = (_file: File | null) => {
    if (!_file) return;
    if (_file?.size > 5 * 1024 * 1024) {
      addToast({
        message: "파일 크기는 5mb 이하로 올려주세요",
        type: "error",
      });
      return;
    }
    if (_file) {
      setValue("detailImage", _file);
      setDetailImagePreview(URL.createObjectURL(_file));
    } else {
      setDetailImagePreview("");
      setValue("detailImage", undefined);
    }
  };

  const onSubmit = (data: any) => {
    setLoading(true);
    try {
      const formData = new FormData();

      if (!data?.name) {
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
      if (!data?.startPrice) {
        addToast({
          message: "시작 가격을 입력해주세요",
          type: "error",
        });
        setLoading(false);
        return;
      }
      if (!data?.estimatedPrice) {
        addToast({
          message: "추정 가격을 입력해주세요",
          type: "error",
        });
        setLoading(false);
        return;
      }
      if (!data?.startTime) {
        addToast({
          message: "시작 시간을 입력해주세요",
          type: "error",
        });
        setLoading(false);
        return;
      }
      if (!data?.endTime) {
        addToast({
          message: "종료 시간을 입력해주세요",
          type: "error",
        });
        setLoading(false);
        return;
      }

      if (!data?.images || data?.images?.length === 0) {
        addToast({
          message: "이미지를 올려주세요",
          type: "error",
        });
        setLoading(false);
        return;
      }
      if (data?.images?.length > 5) {
        addToast({
          message: "5개 이하의 이미지를 올려주세요",
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

      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("startPrice", data.startPrice);
      formData.append("estimatedPrice", data.estimatedPrice);
      formData.append("startTime", data.startTime);
      formData.append("endTime", data.endTime);
      formData.append("detailImage", data.detailImage);
      data.images.forEach((image: any) => {
        formData.append("images", image);
      });

      API.Auction.createAuction(formData)
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
        label="name"
        variant="outlined"
        {...register("name")}
      />
      <Box sx={{ display: "flex", flexDirection: "row", height: 40 }} />
      <TextField
        id="description"
        label="Description"
        variant="outlined"
        {...register("description")}
      />
      <Box sx={{ display: "flex", flexDirection: "row", height: 40 }} />
      <TextField
        id="start-price"
        label="Start Price"
        type="number"
        {...register("startPrice")}
      />
      <FormHelperText>경매 시작가입니다, 숫자로 입력하세요</FormHelperText>
      <Box sx={{ display: "flex", flexDirection: "row", height: 40 }} />
      <TextField
        id="estimated-price"
        label="Estimated Price"
        type="number"
        {...register("estimatedPrice")}
      />
      <FormHelperText>상품의 추정가입니다, 숫자로 입력하세요</FormHelperText>
      <Box sx={{ display: "flex", flexDirection: "row", height: 40 }} />
      <DateTimePicker
        label="Start Time"
        value={watch("startTime") || getValues("startTime")}
        onChange={(e) => {
          if (e === null) return;
          setValue("startTime", e);
        }}
      />
      <Box sx={{ display: "flex", flexDirection: "row", height: 40 }} />
      <DateTimePicker
        label="end Time"
        value={watch("endTime") || getValues("endTime")}
        onChange={(e) => {
          if (e === null) return;
          setValue("endTime", e);
        }}
      />
      <Box sx={{ display: "flex", flexDirection: "row", height: 40 }} />
      <MuiFileInput
        label="images"
        multiple
        value={watch("images") || getValues("images")}
        onChange={(e) => {
          handleFileChange(e);
        }}
      />
      <FormHelperText>
        5개까지 올릴 수 있습니다. 하나당 파일 크기는 5mb로 제한되고 권장 크기는
        1x1입니다.
      </FormHelperText>
      <Box sx={{ display: "flex", flexDirection: "row", height: 20 }} />
      {imagesPreview.length > 0 && (
        <>
          <ImageList cols={5}>
            {imagesPreview.map((item, idx) => (
              <ImageListItem key={idx}>
                <img
                  src={item}
                  alt="preview"
                  loading="lazy"
                  style={{
                    // height: "400px",
                    objectFit: "contain",
                  }}
                />
              </ImageListItem>
            ))}
          </ImageList>
          <Box sx={{ display: "flex", flexDirection: "row", height: 40 }} />
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
        1개만 올릴 수 있습니다. 하나당 파일 크기는 5mb로 제한되고 세로로 긴
        이미지로 올려주세요.
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

export default CreateAuction;
