"use client";

import { JSX } from "react";
import { Label } from "./ui/label";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenuItem,
  SidebarTrigger,
} from "./ui/sidebar";
import { useAuth } from "./auth/AuthContext";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  LogOut,
  Home,
  Settings,
  BookOpen,
  Users,
  HelpCircle,
  GraduationCap,
  Folder,
  Map,
  List,
  PlusCircle,
} from "lucide-react";
import { Button } from "./ui/button";
import { UserAvatar } from "./ui/userAvatar";
import { CustomTrigger } from "./ui/custom-trigger";
import { Tooltip, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./ui/dropdown-menu";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Role } from "@/types/user";

type Navbar = {
  label: string;
  path: string;
  icon?: JSX.Element;
};

type primaryNavItemsProps = {
  icon: Navbar["icon"];
  label: Navbar["label"];
  path: Navbar["path"];
  nested?: Navbar[];
};

export function AppSidebar() {
  const { user, logout } = useAuth();
  const path = usePathname();
  const router = useRouter();
  const isMobile = useIsMobile();
  const isCoordinator = user?.role === Role.COORDINATOR;

  // Excluded paths where sidebar shouldn't render
  const excludedPaths = ["/professor/select-area", "/auth/login"];

  // Check if current path should exclude sidebar
  if (excludedPaths.includes(path)) return null;

  const primaryNavItems: primaryNavItemsProps[] = [
    {
      icon: <Home size={20} />,
      label: "Dashboard",
      path: `/${user?.role.toLowerCase()}/dashboard`,
    },
    {
      icon: <BookOpen size={20} />,
      label: "Cursos",
      path: "/course",
    },
    isCoordinator
      ? {
          icon: <Users size={20} />,
          label: "Turmas",
          path: "/classgrade",
        }
      : null,
    {
      icon: <Settings size={20} />,
      label: "Modalidades",
      path: "/modality",
    },
    {
      icon: <GraduationCap size={20} />,
      label: "Disciplinas",
      path: "/discipline",
    },
    {
      icon: <Folder size={20} />,
      label: "Projeto Pedagógico de Curso",
      path: "/ppc/list",
      nested: [
        {
          icon: <List size={16} />,
          label: "Todos os PPCs",
          path: "/ppc/list",
        },
        {
          icon: <PlusCircle size={16} />,
          label: "Criar PPC",
          path: "/ppc/create",
        },
      ],
    },
    isCoordinator
      ? {
          icon: <Map size={20} />,
          label: "Eixo",
          path: "/coordinator/list-areas",
        }
      : null,
  ].filter((item) => item !== null);

  const secondaryNavItems: primaryNavItemsProps[] = [
    { icon: <Settings size={20} />, label: "Configurações", path: "/settings" },
    { icon: <HelpCircle size={20} />, label: "Ajuda", path: "/help" },
  ];

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  const NavigationItem = ({
    item,
    index,
    isCoordinator,
  }: {
    item: primaryNavItemsProps;
    index: number;
    isCoordinator: boolean;
  }) => (
    <Tooltip key={index} delayDuration={300}>
      <TooltipTrigger asChild>
        {isCoordinator && item.nested ? (
          <DropdownMenu>
            <DropdownMenuTrigger className="w-full">
              <div className="flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors duration-200 bg-primary/10 text-primary font-medium text-start">
                <div className="text-primary">{item.icon}</div>
                <Label className="font-medium cursor-pointer">
                  {item.label}
                </Label>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {item.nested.map((nestedItem, nestedIndex) => (
                <DropdownMenuItem
                  key={nestedIndex}
                  className="flex items-center ml-3 rounded-lg cursor-pointer transition-colors duration-200 text-primary font-medium"
                  onClick={() => handleNavigation(nestedItem.path)}
                >
                  <div className="text-primary mr-3">{nestedItem.icon}</div>
                  <Label className="font-medium cursor-pointer">
                    {nestedItem.label}
                  </Label>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <SidebarMenuItem
            className="flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors duration-200 bg-primary/10 text-primary font-medium"
            onClick={() => handleNavigation(item.path)}
          >
            <div className="text-primary">{item.icon}</div>
            <Label className="font-medium cursor-pointer">{item.label}</Label>
          </SidebarMenuItem>
        )}
      </TooltipTrigger>
    </Tooltip>
  );

  return (
    <TooltipProvider>
      <Sidebar
        collapsible="offcanvas"
        className="w-64 transition-all duration-300 ease-in-out border-r"
      >
        <SidebarHeader className="flex flex-col px-1 py-1 border-b bg-background sticky top-0 z-10 lg:fixed lg:inset-x-0 lg:top-0 lg:flex lg:h-20 lg:flex-row lg:justify-between lg:border-b lg:bg-background lg:py-5 items-center">
          <div className="flex items-center mb-1">
            {isMobile ? (
              <CustomTrigger className="absolute top-0 right-3 mt-3" />
            ) : (
              <SidebarTrigger />
            )}
          </div>
          <div className="flex items-center gap-1 lg:ml-32">
            {isMobile && (
              <h3 className="font-bold text-xl tracking-tight">ClassPlanner</h3>
            )}
            <Image
              src="/logo.png"
              alt="Class Planner"
              width={50}
              height={50}
              className="object-contain"
            />
          </div>
          {user && (
            <div
              className={`flex gap-2 ${isMobile ? "self-start" : "self-center"}`}
            >
              <UserAvatar {...user} />
            </div>
          )}
        </SidebarHeader>

        <SidebarContent className="px-3 py-4 lg:mt-20">
          <SidebarGroup>
            <SidebarGroupLabel className="text-xs uppercase tracking-wider text-muted-foreground px-3 mb-2">
              Navegação Principal
            </SidebarGroupLabel>
            <SidebarGroupContent className="space-y-1">
              {primaryNavItems.map((item, index) => (
                <NavigationItem
                  isCoordinator={isCoordinator}
                  key={index}
                  item={item}
                  index={index}
                />
              ))}
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup className="mt-6">
            <SidebarGroupLabel className="text-xs uppercase tracking-wider text-muted-foreground px-3 mb-2">
              Sistema
            </SidebarGroupLabel>
            <SidebarGroupContent className="space-y-1">
              {secondaryNavItems.map((item, index) => (
                <NavigationItem
                  isCoordinator
                  key={index}
                  item={item}
                  index={index}
                />
              ))}
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="p-2 border-t">
          <Button
            variant="outline"
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 rounded-lg p-2 text-red-500 hover:bg-red-500 hover:text-white hover:border-red-500 transition-colors"
          >
            <LogOut size={18} />
            <span>Sair da sessão</span>
          </Button>
        </SidebarFooter>
      </Sidebar>
    </TooltipProvider>
  );
}
