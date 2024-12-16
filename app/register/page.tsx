"use client";

import { Card, CardBody, CardHeader } from "@nextui-org/react";
import Image from "next/image";

export default function Register() {
  return (
    <Card className="py-4 bg-red-500">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <p className="text-tiny uppercase font-bold">Daily Mix</p>
        <small className="text-default-500">12 Tracks</small>
        <h4 className="font-bold text-large">Frontend Radio</h4>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <h1>BODY</h1>
      </CardBody>
    </Card>
  );
}
