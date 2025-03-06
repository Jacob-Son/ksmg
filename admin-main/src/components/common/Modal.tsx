"use client";

import { Box, Container, Drawer, Modal, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { Subject } from "rxjs";

type RightDrawerProps = {
  children: React.ReactNode;
  title: string;
  subTitle?: string;
};

function CommonModal() {
  const [open, setOpen] = React.useState(false);
  const [props, setProps] = React.useState<RightDrawerProps | null>(null);

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const subscription = observable$.subscribe((payload) => {
      if (payload.cmd === "show") {
        setProps(payload.props);
      } else if (payload.cmd === "hide") {
        setProps(null);
      }
    });
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (props) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [props]);

  if (!props) return null;
  return (
    <Modal
      open={open}
      onClose={handleClose}
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Container sx={containerStyle}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            variant="h4"
            sx={{
              fontSize: "28px",
              fontWeight: 600,
            }}
          >
            {props.title}
          </Typography>
        </Box>
        {props.subTitle && (
          <Typography variant="body1" sx={{ color: "#67676C" }}>
            {props.subTitle}
          </Typography>
        )}
        {props.children}
      </Container>
    </Modal>
  );
}

export default CommonModal;

const containerStyle = {
  backgroundColor: "white",
  width: "500px",
  maxWidth: "100vw",
  padding: "20px",
};

const observable$ = new Subject<
  { cmd: "show"; props: RightDrawerProps } | { cmd: "hide" }
>();
CommonModal.show = (props: RightDrawerProps) =>
  observable$.next({ cmd: "show", props });
CommonModal.hide = () => observable$.next({ cmd: "hide" });
