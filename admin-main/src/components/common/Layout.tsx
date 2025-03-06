"use client";

import * as React from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { usePathname, useRouter } from "next/navigation";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import PersonIcon from "@mui/icons-material/Person";
import PanoramaIcon from "@mui/icons-material/Panorama";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Alert, Backdrop, CircularProgress, Snackbar } from "@mui/material";
import useLoadinStore from "@/store/loading";
import useToastStore, { IToast } from "@/store/toast";
import { Event, Login, Note, Recommend } from "@mui/icons-material";
import GavelIcon from "@mui/icons-material/Gavel";
import ViewCarouselIcon from "@mui/icons-material/ViewCarousel";
import LoginPage from "../login/LoginPage";
import { signOut, useSession } from "next-auth/react";
import { useUserStore } from "@/store/user";
import { API } from "@/service/api";
import LegendToggleIcon from "@mui/icons-material/LegendToggle";
import PaymentIcon from "@mui/icons-material/Payment";

export enum Routes {
  HOME = "/",
  Settle = "/settle",
  FEE = "/fee",
  USER = "/user",
  NFT = "/nft",
  AUCTION = "/auction",
  Event = "/event",
  Banner = "/banner",
  ORDER = "/order",
  RECOMMEND = "/recommend",
  MONITORING = "/monitoring",
  COMBINE = "/combine",
  NOTICE = "/notice",
  FAQ = "/faq",
}

const routes = [
  {
    name: "마이페이지",
    path: Routes.HOME,
    icon: <Login />,
  },
  {
    name: "정산",
    path: Routes.Settle,
    icon: <AddBusinessIcon />,
  },
  {
    name: "주문",
    path: Routes.ORDER,
    icon: <PaymentIcon />,
  },
  {
    name: "플랫폼 수수료",
    path: Routes.FEE,
    icon: <AttachMoneyIcon />,
  },
  {
    name: "유저",
    path: Routes.USER,
    icon: <PersonIcon />,
  },
  {
    name: "NFT",
    path: Routes.NFT,
    icon: <PanoramaIcon />,
  },
  {
    name: "이벤트",
    path: Routes.Event,
    icon: <Event />,
  },
  {
    name: "공지사항",
    path: Routes.NOTICE,
    icon: <Event />,
  },
  {
    name: "FAQ",
    path: Routes.FAQ,
    icon: <Event />,
  },
  {
    name: "배너",
    path: Routes.Banner,
    icon: <ViewCarouselIcon />,
  },
  {
    name: "추천 작품",
    path: Routes.RECOMMEND,
    icon: <Recommend />,
  },
  {
    name: "경매",
    path: Routes.AUCTION,
    icon: <GavelIcon />,
  },
  {
    name: "모니터링",
    path: Routes.MONITORING,
    icon: <LegendToggleIcon />,
  },
  {
    name: "복각본 신청 내역",
    path: Routes.COMBINE,
    icon: <Note />,
  },
];

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathName = usePathname();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const { status, data: session } = useSession();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const { loading } = useLoadinStore();
  const { toastMap } = useToastStore();
  const { user, setUser } = useUserStore();

  const toastList: IToast[] = Array.from(toastMap.values());

  const [realStatus, setRealStatus] = React.useState<
    "unauthenticated" | "loading" | "authenticated"
  >("loading");

  React.useEffect(() => {
    if (status === "unauthenticated") {
      setRealStatus("unauthenticated");
    }
  }, [status]);

  React.useEffect(() => {
    if (!session) return;
    sessionStorage.setItem("accessToken", (session as any).accessToken);
    API.Auth.signIn((session as any).accessToken).then((res: any) => {
      if (res.success) {
        if (res.data?.userInfo.role !== "ADMIN") {
          alert("관리자만 접근 가능합니다.");
          signOut();
          return;
        }
        setUser(res.data?.userInfo ?? null);
        setRealStatus("authenticated");
      } else {
        console.log(res.error);
        setRealStatus("unauthenticated");
        signOut();
      }
    });
  }, [session]);

  if (realStatus === "loading") return <div>권한 확인중입니다...</div>;
  if (realStatus === "unauthenticated") return <LoginPage />;

  return (
    <Box sx={{ display: "flex" }}>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {toastList.map((toast, idx) => (
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={true}
          message={toast.message}
          key={idx}
        >
          <Alert severity={toast.type}>{toast.message}</Alert>
        </Snackbar>
      ))}
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {routes.find((route) => route.path === pathName)?.name || ""}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {routes.map((route, index) => {
            if (!user) return null;

            const isMaster = user.isMasterAdmin;
            if (
              !isMaster &&
              (route.path === Routes.MONITORING ||
                route.path === Routes.Settle ||
                route.path === Routes.NFT ||
                route.path === Routes.AUCTION ||
                route.path === Routes.FEE)
            )
              return null;
            return (
              <ListItem
                key={route.name}
                disablePadding
                sx={{ display: "block" }}
                onClick={() => {
                  router.push(route.path);
                }}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {route.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={route.name}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          {children}
        </LocalizationProvider>
      </Box>
    </Box>
  );
}
