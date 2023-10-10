// import React from "react";
// import { useSnackbar } from "notistack";
// import { AlertVariants } from "../libs/types";

// export default function useNotification() {
//     const { enqueueSnackbar, closeSnackbar } = useSnackbar();

//     const renderForVariant = React.useCallbac(
//       ({ variant = AlertVariants.Default, BoxType = MessageBox, title = null }) =>
//         (key, message) => {
//           return (
//             // @ts-ignore
//             <BoxType
//               key={key}
//               title={title}
//               Icon={IconsMap[variant]}
//               variant={variant}
//               onClose={() => closeSnackbar(key)}
//             >
//               {message}
//             </BoxType>
//           );
//         },
//       [closeSnackbar]
//     );

//     const toast = (message: any, options: OptionsObject = {}) => {
//       // @ts-ignore
//       enqueueSnackbar(message, {
//         content: renderForVariant({
//           variant: options.variant,
//           BoxType: ToastBox,
//         }),
//         ...options,
//         anchorOrigin: {
//           vertical: "top",
//           horizontal: "center",
//         },
//       });
//     };

//     const enqueue = (message: any, options: OptionsObject = {}) => {
//       // @ts-ignore
//       enqueueSnackbar(message, {
//         content: renderForVariant({
//           variant: options.variant,
//           BoxType: MessageBox,
//           title: options.title,
//         }),
//         ...options,
//         anchorOrigin: {
//           vertical: "top",
//           horizontal: "center",
//         },
//       });
//     };

//     const showErrorMessage =
//       (enqueueSnackbar: any) =>
//       (debugTitle: string, err: any, options: OptionsObject = {}) => {
//         const _debugTitle = isDevelopment() ? `(${debugTitle})` : "";

//         const showMessage = (message: string) =>
//           enqueueSnackbar(`${_debugTitle} ${message}`, {
//             content: renderForVariant({
//               variant: AlertVariants.Error,
//               BoxType: MessageBox,
//             }),
//             autoHideDuration: 5000,
//             ...options,
//             anchorOrigin: {
//               vertical: "top",
//               horizontal: "center",
//             },
//           });

//         return showMessage(guessMessage(err));
//       };

//     return {
//       toast,
//       enqueue,
//       showError: showErrorMessage(enqueueSnackbar),
//     };
//   }
