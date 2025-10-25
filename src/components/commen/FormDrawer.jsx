"use client";
import React from "react";
import { Drawer, Box, Typography, Button } from "@mui/material";

export default function FormDrawer({
    title = "Form",
    saveLabel = "Save",
    isOpen,
    onClose,
    onSave,
    children,
}) {
    return (
        <Drawer
            anchor="right"
            open={isOpen}
            onClose={onClose}
            PaperProps={{
                sx: { width: { xs: 350, sm: 400 }, display: "flex", flexDirection: "column", height: "100vh" },
            }}
        >
            {/* Header */}
            <Box sx={{ p: 2, borderBottom: "1px solid #e0e0e0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography variant="h6" sx={{
                    fontWeight: "600",
                }}>{title}</Typography>
                <Button onClick={onClose} variant="text"  sx={{
    fontFamily: "Inter, sans-serif",
    color: "black",
    minWidth: "unset",        
    padding: "5px 5px",       
    borderRadius: "6px",      
    lineHeight: 1,            
    "&:hover": {
      backgroundColor: "rgba(0,0,0,0.05)", // subtle hover effect
    },
  }}>✕</Button>
            </Box>

            {/* Scrollable content */}
            <Box sx={{ flex: 1, overflowY: "auto", p: 2, fontFamily: "Inter, sans-serif", }} >
                {children}
            </Box>

            {/* Footer */}
            <Box sx={{ p: 2, borderTop: "1px solid #e0e0e0", display: "flex", justifyContent: "flex-end", gap: 1, fontFamily: "Inter, sans-serif", }}>
                <Button onClick={onClose} variant="outlined" sx={{ fontFamily: "Inter, sans-serif"}}>Cancel</Button>
                <Button onClick={onSave} variant="contained" color="primary" sx={{ fontFamily: "Inter, sans-serif"}}>{saveLabel}</Button>
            </Box>
        </Drawer>
    );
}
