import { AuditLog, AUDITLOG_ACTION } from "@/types/audit-log";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

type ResourceInfo = {
  name: string;
  gender: "m" | "f";
};

const getResourceInfo = (url: string): ResourceInfo => {
  // All routes in alphabetical order with proper gender assignment
  if (url.includes("/area")) return { name: "área", gender: "f" };
  if (url.includes("/audit-log"))
    return { name: "registro de auditoria", gender: "m" };
  if (url.includes("/classgrade")) {
    if (url.includes("/classgrade-discipline"))
      return { name: "disciplina da turma", gender: "f" };
    return { name: "turma", gender: "f" };
  }
  if (url.includes("/course")) return { name: "curso", gender: "m" };
  if (url.includes("/dayoff"))
    return { name: "dia de preparação", gender: "m" };
  if (url.includes("/discipline")) return { name: "disciplina", gender: "f" };
  if (url.includes("/interest-selection"))
    return { name: "seleção de interesse", gender: "f" };
  if (url.includes("/modality")) return { name: "modalidade", gender: "f" };
  if (url.includes("/pedagogical-project"))
    return { name: "projeto pedagógico", gender: "m" };
  if (url.includes("/period")) return { name: "período", gender: "m" };
  if (url.includes("/professor-classgrade"))
    return { name: "alocação de professor", gender: "f" };
  if (url.includes("/uploads")) return { name: "arquivo", gender: "m" };
  if (url.includes("/user")) return { name: "usuário", gender: "m" };

  // Default case
  return { name: "recurso", gender: "m" };
};

const getActionVerb = (action: AUDITLOG_ACTION): string => {
  switch (action) {
    case AUDITLOG_ACTION.CREATE:
      return "criou";
    case AUDITLOG_ACTION.UPDATE:
      return "atualizou";
    case AUDITLOG_ACTION.DELETE:
      return "excluiu";
    default:
      return "modificou";
  }
};

export const formatAuditLogMessage = (
  auditLog: AuditLog
): {
  title: string;
  description: string;
} => {
  const resourceInfo = getResourceInfo(auditLog.url);
  const actionVerb = getActionVerb(auditLog.action);
  const article = resourceInfo.gender === "f" ? "uma" : "um";

  const title = `${actionVerb.charAt(0).toUpperCase() + actionVerb.slice(1)} ${article} ${resourceInfo.name}`;

  const timeAgo = formatDistanceToNow(new Date(auditLog.created_at), {
    addSuffix: true,
    locale: ptBR,
  });

  return {
    title,
    description: timeAgo,
  };
};
