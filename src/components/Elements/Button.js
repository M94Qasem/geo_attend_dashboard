import React from "react";
import PropTypes from "prop-types";

export default function Button({
  children,
  variant = "primary",
  type = "button",
  onClick,
  className = "",
  ...props
}) {
  // الكلاسات الأساسية المشتركة بين كل الأزرار
  const baseClasses =
    "font-semibold px-5 py-2.5 rounded-lg shadow-sm transition-all duration-200 text-sm focus:outline-none focus:ring-2 focus:ring-offset-2";

  // الكلاسات الخاصة بكل نوع (variant)
  const variantClasses = {
    primary: "bg-indigo-500 hover:bg-indigo-600 text-white focus:ring-indigo-500",
    secondary: "bg-gray-500 hover:bg-gray-600 text-white focus:ring-gray-500",
    // يمكنك إضافة أنواع أخرى مستقبلاً مثل 'danger' أو 'success'
    // danger: "bg-red-500 hover:bg-red-600 text-white focus:ring-red-500",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(["primary", "secondary"]),
  type: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
};
