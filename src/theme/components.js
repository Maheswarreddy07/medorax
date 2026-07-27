import COLORS from "./colors";
import SPACING from "./spacing";
import RADIUS from "./radius";
import SHADOWS from "./shadows";
import TYPOGRAPHY from "./typography";

const COMPONENTS = {

  // =====================================================
  // BUTTON
  // =====================================================

  button: {

    height: {
      sm: "40px",
      md: "48px",
      lg: "56px"
    },

    padding: {
      sm: "0 16px",
      md: "0 24px",
      lg: "0 32px"
    },

    radius: RADIUS.lg,

    fontSize: TYPOGRAPHY.body.md,

    fontWeight: TYPOGRAPHY.weight.semibold,

    shadow: SHADOWS.button,

    primary: {
      background: COLORS.gradient,
      color: COLORS.white,
      border: "none"
    },

    secondary: {
      background: COLORS.white,
      color: COLORS.primary,
      border: `1px solid ${COLORS.border}`
    },

    ghost: {
      background: "transparent",
      color: COLORS.primary,
      border: "none"
    },

    danger: {
      background: COLORS.danger,
      color: COLORS.white,
      border: "none"
    },

    success: {
      background: COLORS.success,
      color: COLORS.white,
      border: "none"
    }

  },

  // =====================================================
  // INPUT
  // =====================================================

  input: {

    height: "48px",

    radius: RADIUS.lg,

    padding: "0 16px",

    background: COLORS.inputBackground,

    border: `1px solid ${COLORS.inputBorder}`,

    borderFocus: COLORS.primary,

    placeholder: COLORS.textMuted,

    text: COLORS.textPrimary,

    shadow: SHADOWS.xs

  },

  // =====================================================
  // CARD
  // =====================================================

  card: {

    background: COLORS.card,

    radius: RADIUS.xl,

    border: `1px solid ${COLORS.border}`,

    shadow: SHADOWS.md,

    padding: SPACING.cardPadding

  },

  // =====================================================
  // MODAL
  // =====================================================

  modal: {

    radius: RADIUS.xl,

    shadow: SHADOWS.modal,

    background: COLORS.white,

    overlay: COLORS.overlay,

    padding: "32px"

  },

  // =====================================================
  // TABLE
  // =====================================================

  table: {

    headerBackground: COLORS.tableHeader,

    rowHover: COLORS.tableRowHover,

    border: COLORS.border,

    radius: RADIUS.lg

  },

  // =====================================================
  // SIDEBAR
  // =====================================================

  sidebar: {

    width: SPACING.sidebarWidth,

    background: COLORS.sidebar,

    border: COLORS.sidebarBorder,

    itemHover: COLORS.sidebarHover,

    active: COLORS.sidebarActive,

    text: COLORS.textSecondary,

    activeText: COLORS.primary

  },

  // =====================================================
  // NAVBAR
  // =====================================================

  navbar: {

    height: SPACING.navbarHeight,

    background: COLORS.navbar,

    border: COLORS.navbarBorder,

    shadow: SHADOWS.sm

  },

  // =====================================================
  // BADGES
  // =====================================================

  badge: {

    online: {
      background: COLORS.successLight,
      color: COLORS.success
    },

    offline: {
      background: COLORS.backgroundSecondary,
      color: COLORS.offline
    },

    pending: {
      background: COLORS.warningLight,
      color: COLORS.warning
    }

  },

  // =====================================================
  // AUTH CARD
  // =====================================================

  authCard: {

    width: "480px",

    padding: "40px",

    background: COLORS.white,

    radius: RADIUS.xl,

    border: `1px solid ${COLORS.border}`,

    shadow: SHADOWS.lg

  },

  // =====================================================
  // LOGIN PAGE
  // =====================================================

  login: {

    background: COLORS.background,

    leftPanel: COLORS.gradient,

    formBackground: COLORS.white

  },

  // =====================================================
  // DASHBOARD
  // =====================================================

  dashboard: {

    background: COLORS.background,

    widget: COLORS.white,

    widgetRadius: RADIUS.xl,

    widgetShadow: SHADOWS.md

  },

  // =====================================================
  // TOAST
  // =====================================================

  toast: {

    radius: RADIUS.lg,

    success: COLORS.success,

    error: COLORS.danger,

    warning: COLORS.warning,

    info: COLORS.primary

  }

};

export default COMPONENTS;