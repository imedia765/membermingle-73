import React from 'react';

interface CardProps {
  title: string;
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, children }) => {
    return (
        <div>
            <div>{title}</div>
            {children}
        </div>
    );
};

const CardHeader = (props: React.PropsWithChildren) => {
  return <div>{props.children}</div>
}
const CardTitle = (props: React.PropsWithChildren) => {
  return <div>{props.children}</div>
}
const CardContent = (props: React.PropsWithChildren) => {
  return <div>{props.children}</div>
}

export { Card, CardHeader, CardTitle, CardContent };
