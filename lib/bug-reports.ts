export type Severity = "Critical" | "High" | "Medium" | "Low";
export type Priority = "High" | "Medium" | "Low";
export type BugStatus = "Open" | "In Progress" | "Resolved" | "Closed";

export interface BugMedia {
  type: "image" | "video";
  src: string;
  caption?: string;
}

export interface BugReport {
  id: string;
  title: string;
  category: string;
  severity: Severity;
  priority: Priority;
  environment: string;
  platform: string;
  buildVersion: string;
  stepsToReproduce: string[];
  expectedResult: string;
  actualResult: string;
  notes: string;
  status: BugStatus;
  media?: BugMedia[];
}

export const bugReports: BugReport[] = [
  {
    id: "BUG-001",
    title: "Character Animation Delay After Ability Use",
    category: "Animation / Gameplay",
    severity: "Medium",
    priority: "Medium",
    environment: "Local Practice Build v0.1",
    platform: "PC",
    buildVersion: "Sample Build 2026.07.15",
    stepsToReproduce: [
      "Launch practice mode and select any hero with a channeling ability.",
      "Use ability and immediately attempt to move.",
      "Observe transition from ability animation to movement animation.",
      "Repeat with different abilities and notice inconsistent delay.",
    ],
    expectedResult:
      "Character should smoothly transition from ability animation to movement animation within 1 frame.",
    actualResult:
      "There is a visible 200-400ms delay before the movement animation plays after ability use.",
    notes:
      "Sample observation. Delay varies depending on the ability used. May be related to animation state blending.",
    status: "Open",
  },
  {
    id: "BUG-002",
    title: "Weapon Model Clips Through Wall at Specific Angle",
    category: "Visual / Collision",
    severity: "Low",
    priority: "Low",
    environment: "Local Practice Build v0.1",
    platform: "PC",
    buildVersion: "Sample Build 2026.07.15",
    stepsToReproduce: [
      "Load any map with narrow corridors.",
      "Equip weapon and position character at a 45-degree angle to a wall.",
      "Move forward until character touches the wall.",
      "Observe weapon model clipping through the wall surface.",
    ],
    expectedResult:
      "Weapon model should remain behind the wall or be hidden by the camera perspective.",
    actualResult:
      "Weapon model geometry clips through the wall texture at certain angles.",
    notes:
      "Sample practice observation. Minor visual issue. Occurs in specific camera-to-wall configurations.",
    status: "Open",
  },
  {
    id: "BUG-003",
    title: "Inventory Item Tooltip Displays Incorrect Stats",
    category: "UI / Localization",
    severity: "Medium",
    priority: "High",
    environment: "Local Practice Build v0.1",
    platform: "PC",
    buildVersion: "Sample Build 2026.07.15",
    stepsToReproduce: [
      "Open inventory screen.",
      "Hover over any equippable item in the list.",
      "Compare displayed stat values with actual stat changes when equipped.",
      "Cycle through multiple items and check for inconsistencies.",
    ],
    expectedResult:
      "Tooltip should display accurate stat values that match the item's actual effect.",
    actualResult:
      "Tooltip shows +12 damage but item only applies +8 damage when equipped. Several items show similar discrepancies.",
    notes:
      "Sample practice finding. Potential data mismatch between tooltip UI and backend item stats.",
    status: "Open",
  },
  {
    id: "BUG-004",
    title: "Audio Cue Does Not Play During Zone Closure Warning",
    category: "Audio",
    severity: "High",
    priority: "High",
    environment: "Local Practice Build v0.1",
    platform: "PC",
    buildVersion: "Sample Build 2026.07.15",
    stepsToReproduce: [
      "Start a match and wait for the first zone closure phase.",
      "Pay attention to the audio channel when the zone warning appears.",
      "Compare audio behaviour across multiple matches.",
      "Check audio settings to confirm volume is enabled.",
    ],
    expectedResult:
      "A distinct audio cue should play 5 seconds before the zone begins closing.",
    actualResult:
      "No audio cue is heard. Visual warning displays correctly but audio is missing.",
    notes:
      "Sample observation. Consistent across multiple matches. May be related to audio trigger event not firing.",
    status: "Open",
  },
];
