import React from "react";

const Row = React.forwardRef(({ className, children, onClick }, ref) => {
  return (
    <div
      className={className}
      onClick={onClick}
      ref={ref}
      style={{ display: "flex" }}
    >
      {children}
    </div>
  );
});

export default Row;
