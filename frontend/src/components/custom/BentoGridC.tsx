"use client";
import React from "react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import {
  IconCloud,
  IconContainer,
  IconApi,
  IconRobot,
  IconServer,
  IconLock,
  IconDeviceAnalytics,
} from "@tabler/icons-react";
import Image from "next/image";

export function BentoGridC() {
  return (
    <BentoGrid className="max-w-5xl mx-auto">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={item.header}
          icon={item.icon}
          className={i === 3 || i === 6 ? "md:col-span-2" : ""}
        />
      ))}
    </BentoGrid>
  );
}

const FeatureCard = ({ icon, bgClass }: { icon: string, bgClass: string }) => (
  <div className={`flex items-center justify-center w-full h-full min-h-[10rem] rounded-xl ${bgClass} transition-all hover:scale-[1.01] duration-300`}>
    <Image src={`/${icon}.svg`} alt={icon} width={60} height={60} className="opacity-90" />
  </div>
);

const items = [
  {
    title: "Docker-Based Deployments",
    description: "Deploy your applications with Docker, ensuring consistent environments across development and production.",
    header: <FeatureCard icon="docker" bgClass="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/20" />,
    icon: <IconContainer className="h-4 w-4 text-blue-500" />,
  },
  {
    title: "API Gateway",
    description: "Manage all your APIs through a single, unified gateway with advanced routing and rate limiting.",
    header: <FeatureCard icon="fastapi" bgClass="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/30 dark:to-green-900/20" />,
    icon: <IconApi className="h-4 w-4 text-green-500" />,
  },
  {
    title: "AI-Driven Optimization",
    description: "Let our AI automatically optimize your infrastructure for performance, cost, and reliability.",
    header: <div className="flex items-center justify-center w-full h-full min-h-[10rem] rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/30 dark:to-purple-900/20 transition-all hover:scale-[1.01] duration-300">
      <IconRobot className="w-16 h-16 text-purple-500/80" />
    </div>,
    icon: <IconRobot className="h-4 w-4 text-purple-500" />,
  },
  {
    title: "Seamless CI/CD Integration",
    description: "Integrate with your existing CI/CD pipelines for automated testing and deployments with zero friction.",
    header: <div className="flex items-center justify-center w-full h-full min-h-[10rem] rounded-xl bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950/30 dark:to-orange-900/20 transition-all hover:scale-[1.01] duration-300">
      <div className="grid grid-cols-2 gap-3">
        <Image src="/react.svg" alt="React" width={40} height={40} className="opacity-80" />
        <Image src="/nextjs.svg" alt="Next.js" width={40} height={40} className="opacity-80" />
        <Image src="/angular.svg" alt="Angular" width={40} height={40} className="opacity-80" />
        <Image src="/vuejs.svg" alt="Vue.js" width={40} height={40} className="opacity-80" />
      </div>
    </div>,
    icon: <IconCloud className="h-4 w-4 text-orange-500" />,
  },
  {
    title: "Enterprise-Grade Security",
    description: "Protect your applications with enterprise-level security features, including SSL, WAF, and audit logs.",
    header: <div className="flex items-center justify-center w-full h-full min-h-[10rem] rounded-xl bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950/30 dark:to-red-900/20 transition-all hover:scale-[1.01] duration-300">
      <IconLock className="w-16 h-16 text-red-500/80" />
    </div>,
    icon: <IconLock className="h-4 w-4 text-red-500" />,
  },
  {
    title: "Scalable Infrastructure",
    description: "Scale your applications automatically based on demand, ensuring optimal performance during traffic spikes.",
    header: <div className="flex items-center justify-center w-full h-full min-h-[10rem] rounded-xl bg-gradient-to-br from-cyan-50 to-cyan-100 dark:from-cyan-950/30 dark:to-cyan-900/20 transition-all hover:scale-[1.01] duration-300">
      <IconServer className="w-16 h-16 text-cyan-500/80" />
    </div>,
    icon: <IconServer className="h-4 w-4 text-cyan-500" />,
  },
  {
    title: "Real-Time Analytics",
    description: "Get comprehensive insights into your application's performance, usage, and health in real-time.",
    header: <div className="flex items-center justify-center w-full h-full min-h-[10rem] rounded-xl bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-950/30 dark:to-indigo-900/20 transition-all hover:scale-[1.01] duration-300">
      <IconDeviceAnalytics className="w-16 h-16 text-indigo-500/80" />
    </div>,
    icon: <IconDeviceAnalytics className="h-4 w-4 text-indigo-500" />,
  },
];
