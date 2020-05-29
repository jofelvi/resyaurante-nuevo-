export default theme => ({
  MuiAppBar: {
    positionStatic: {
      borderRadius: theme.shape.borderRadius
    }
  },
  MuiAvatar: {
    colorDefault: {
      backgroundColor: theme.palette.background.default
    }
  },
  MuiButton: {
    label: {
      textTransform: 'initial',
      fontWeight: 700
    },
    outlined: {
      '&:hover': {
        color: '#fff',
        borderColor: theme.palette.primary.main,
        backgroundColor: `${theme.palette.primary.main} !important`
      }
    }
  },
  MuiBreadcrumbs: {
    separator: {
      color: theme.palette.text.textSecondary,
      fontSize: 14,
      fontWeight: 700
    }
  },
  MuiDrawer: {
    paper: {
      borderRadius: theme.shape.borderRadius
    }
  },
  MuiFormControlLabel: {
    label: {
      width: '100%'
    }
  },
  MuiIconButton: {
    root: {
      color: theme.palette.text.secondary
    }
  },
  MuiListSubheader: {
    root: {
      color: theme.palette.primary.main,
      fontSize: 14,
      fontWeight: 700,
      textTransform: 'uppercase'
    }
  },
  MuiListItem: {
    root: {
      '&:hover': {
        backgroundColor: `${theme.palette.background.default} !important`
      }
    },
    selected: {
      color: theme.palette.primary.main,
      backgroundColor: `${theme.palette.background.default} !important`,
      '&:before': {
        content: '""',
        position: 'absolute',
        left: 0,
        width: 3,
        height: '100%',
        background: theme.palette.primary.main
      }
    }
  },
  MuiMenuItem: {
    root: {
      fontSize: 14
    }
  },
  MuiToolbar: {
    gutters: {
      [theme.breakpoints.up('xs')]: {
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(4)
      }
    }
  },
  MuiTypography: {
    h6: {
      fontSize: 18,
      fontWeight: 700
    },
    subtitle1: {
      fontSize: 16,
      fontWeight: 400,
      lineHeight: 1
    },
    subtitle2: {
      fontSize: 14,
      fontWeight: 700
    },
    body1: {
      fontSize: 16,
      fontWeight: 600
    }
  }
});
