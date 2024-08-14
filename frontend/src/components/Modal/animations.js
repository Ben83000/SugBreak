const variants = {
  container: {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  },
  containerCustom: {
    hidden: { x: "-100%", opacity: 0 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { staggerChildren: 0.05, type: "spring" },
    },
    exit: {
      opacity: 0,
      x: "100%",
      transition: { type: "spring" },
    },
  },
  child: {
    hidden: { scale: 0, x: "-100%", opacity: 0 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { type: "spring" },
    },
    exit: {
      opacity: 0,
      x: "-100%",
      scale: 0,
      transition: { type: "spring" },
    },
  },
  button: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { delay: 0.6, duration: 0.6 },
    },
    exit: {
      opacity: 0,
    },
  },
  image: {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 360,
      transition: {
        delay: 0.4,
        type: "spring",
        stiffness: 100,
        damping: 10,
        mass: 1,
        velocity: 2,
      },
    },
  },
};

export default variants;
