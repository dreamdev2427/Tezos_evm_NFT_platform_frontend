import React from "react";

interface IHeadingWithIcon {
  Icon: React.ReactNode;
  headingText: string;
  className?: string;
  size?: number;
}

const HeadingWithIcon = ({
  Icon,
  headingText,
  className,
  size,
}: IHeadingWithIcon): JSX.Element => {
  return (
    <div className={`flex items-center my-10 ${className && className}`}>
      {Icon}
      <h2 className={`md:text-${size?.toString()}xl ml-4 font-bold`}>
        {headingText}
      </h2>
    </div>
  );
};

export default HeadingWithIcon;
