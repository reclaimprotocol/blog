import Image from "next/image";
import * as runtime from "react/jsx-runtime";
import { Callout } from "./callout";
import { IntegrationStarterPack } from "./integration-starter-pack";
import { MobileLiveViewComparison } from "./mobile-ux-comparison";
import {
  PopcornFleetFlowDiagram,
  ProductionMetricsChart,
  TeeTrustModel,
  WebRtcVncDiagram,
} from "./popcorn-diagrams";

const useMDXComponent = (code: string) => {
  const fn = new Function(code);
  return fn({ ...runtime }).default;
};

const components = {
  Image,
  Callout,
  IntegrationStarterPack,
  MobileLiveViewComparison,
  PopcornFleetFlowDiagram,
  ProductionMetricsChart,
  TeeTrustModel,
  WebRtcVncDiagram,
};

interface MdxProps {
  code: string;
}

export function MDXContent({ code }: MdxProps) {
  const Component = useMDXComponent(code);
  return <Component components={components} />;
}
