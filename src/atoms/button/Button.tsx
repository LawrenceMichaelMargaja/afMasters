import React from "react";
import { Button } from "@mui/material";

// Define the allowed types for the variant and color props
type ButtonVariant = "text" | "outlined" | "contained";
type ButtonColor = "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning";

interface ButtonComponentProps {
	name?: string;
	disabled?: boolean;
	variant?: ButtonVariant;
	defaultColor?: ButtonColor;
	styledColor?: string;
	margin?: string;
	padding?: string;
	height?: string;
	display?: string;
	justifyContent?: string;
	alignItems?: string;
	width?: string;
	icon?: React.ReactNode;
	borderRadius?: string;
	fontSize?: string;
	fontWeight?: string;
	fontStyle?: string;
	fontFamily?: string;
	textColor?: string;
	method?: "modal" | ((props: unknown) => void);
	methodProps?: unknown;
	onKeyDown?: () => void;
	onKeyUp?: () => void;
}

const ButtonComponent: React.FC<ButtonComponentProps> = ({
	name,
	disabled,
	variant, // Default to "contained"
	defaultColor, // Default to "primary"
	styledColor,
	margin,
	padding,
	height,
	display,
	justifyContent,
	width,
	icon,
	borderRadius,
	fontSize,
	fontWeight,
	fontStyle,
	fontFamily,
	textColor,
	method,
	methodProps,
	onKeyDown,
	onKeyUp,
}) => {
	// const dispatch = useDispatch();

	const handleOpen = () => {
		alert("hello there");
		// dispatch(setModalType('tableModal'));
		// dispatch(setModalState(true));
	};

	return (
		<Button
			style={{
				backgroundColor: styledColor,
				margin: margin,
				padding: padding,
				height: height,
				width: width,
				borderRadius: borderRadius,
				fontSize: fontSize,
				fontWeight: fontWeight,
				display: display,
				justifyContent: justifyContent,
				fontStyle: fontStyle,
				fontFamily: fontFamily,
				color: textColor,
			}}
			disabled={disabled}
			variant={variant}
			color={defaultColor}
			onClick={() => {
				if (method === "modal") {
					handleOpen();
				} else if (method) {
					method(methodProps);
				}
			}}
			onKeyDown={onKeyDown}
			onKeyUp={onKeyUp}
		>
			{icon}
			{name}
		</Button>
	);
};

export default ButtonComponent;
