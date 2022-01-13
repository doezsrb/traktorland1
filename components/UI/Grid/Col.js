import React from "react";

const Col = React.forwardRef(({ children, className, onClick }, ref) => {
  return (
    <div
      ref={ref}
      className={className}
      onClick={onClick}
      style={{ display: "flex", flexDirection: "column" }}
    >
      {children}
    </div>
  );
});

export default Col;
