NIHILVTT/
├─ src/
│  ├─ app/
│  │  ├─ providers/
│  │  │  └─ index.tsx
│  │  ├─ styles/
│  │  │  └─ index.css
│  │  ├─ App.tsx
│  │  ├─ custom.d.ts
│  │  ├─ index.tsx
│  │  └─ vite-env.d.ts
│  ├─ entities/
│  │  ├─ board/
│  │  │  ├─ model/
│  │  │  │  ├─ contexts/
│  │  │  │  │  └─ BoardContext.tsx
│  │  │  │  └─ hooks/
│  │  │  │     └─ useZoomAndPan.ts
│  │  │  └─ ui/
│  │  │     └─ ZoomControls.tsx
│  │  ├─ character/
│  │  │  ├─ lib/
│  │  │  │  └─ utils/
│  │  │  │     └─ characterUtils.ts
│  │  │  ├─ model/
│  │  │  │  ├─ contexts/
│  │  │  │  │  └─ CharactersContext.tsx
│  │  │  │  ├─ hooks/
│  │  │  │  │  ├─ __tests__/
│  │  │  │  │  ├─ useCharacterSheetForm.ts
│  │  │  │  │  └─ useCharactersState.ts
│  │  │  │  └─ schemas/
│  │  │  │     └─ character.schema.ts
│  │  │  └─ ui/
│  │  │     ├─ playerSheet/
│  │  │     │  ├─ configTab/
│  │  │     │  │  └─ PlayerSheetConfigTab.tsx
│  │  │     │  ├─ detailsTab/
│  │  │     │  │  └─ PlayerSheetDetailsTab.tsx
│  │  │     │  ├─ principalTab/
│  │  │     │  │  ├─ AttributeBlock.tsx
│  │  │     │  │  ├─ CombatStats.tsx
│  │  │     │  │  ├─ FeaturesAndTraits.tsx
│  │  │     │  │  ├─ HealthSection.tsx
│  │  │     │  │  ├─ PrincipalAttributesAndSkills.tsx
│  │  │     │  │  ├─ PrincipalHeader.tsx
│  │  │     │  │  ├─ PrincipalHealthAndCombat.tsx
│  │  │     │  │  ├─ PrincipalTab.tsx
│  │  │     │  │  └─ SkillProficiencyItem.tsx
│  │  │     │  ├─ PlayerSheetContent.tsx
│  │  │     │  └─ PlayerSheetTabs.tsx
│  │  │     ├─ CharacterTemplateListItem.tsx
│  │  │     └─ CreatureSheet.tsx
│  │  └─ token/
│  │     ├─ model/
│  │     │  ├─ contexts/
│  │     │  │  ├─ SelectedTokenContext.tsx
│  │     │  │  └─ TokenContext.tsx
│  │     │  └─ hooks/
│  │     │     ├─ useTokenDrag.ts
│  │     │     └─ useTokenState.ts
│  │     └─ ui/
│  │        ├─ BoardToken.tsx
│  │        ├─ HealthBar.tsx
│  │        └─ TokenVisual.tsx
│  ├─ features/
│  │  ├─ boardMarqueeSelection/
│  │  │  ├─ model/
│  │  │  │  └─ hooks/
│  │  │  │     └─ useMarqueeSelection.ts
│  │  │  └─ ui/
│  │  │     └─ MarqueeLayer.tsx
│  │  ├─ boardPanningAndZoom/
│  │  │  ├─ model/
│  │  │  │  └─ hooks/
│  │  │  └─ ui/
│  │  ├─ boardRuler/
│  │  │  ├─ model/
│  │  │  │  └─ hooks/
│  │  │  │     └─ useRuler.ts
│  │  │  ├─ ui/
│  │  │  │  ├─ __tests__/
│  │  │  │  │  └─ RulerPopover.test.tsx
│  │  │  │  ├─ RulerLayer.tsx
│  │  │  │  └─ RulerPopover.tsx
│  │  │  └─ index.ts
│  │  ├─ boardSettings/
│  │  │  ├─ contexts/
│  │  │  │  ├─ __tests__/
│  │  │  │  │  └─ BoardSettingsContext.test.tsx
│  │  │  │  └─ BoardSettingsContext.tsx
│  │  │  ├─ hooks/
│  │  │  │  ├─ __tests__/
│  │  │  │  │  └─ useBoardSettingsState.test.ts
│  │  │  │  └─ useBoardSettingsState.ts
│  │  │  └─ ui/
│  │  │     ├─ PageSettingsButton.tsx
│  │  │     └─ PageSettingsModal.tsx
│  │  ├─ characterCreation/
│  │  │  ├─ model/
│  │  │  │  ├─ hooks/
│  │  │  │  │  └─ useCharacterCreation.ts
│  │  │  │  └─ schemas/
│  │  │  │     └─ simpleName.schema.ts
│  │  │  └─ ui/
│  │  │     └─ SimpleNameModal.tsx
│  │  ├─ characterDropOnBoard/
│  │  │  └─ model/
│  │  │     └─ hooks/
│  │  │        └─ useCharacterDrop.ts
│  │  ├─ characterEditAction/
│  │  │  └─ ui/
│  │  │     └─ ActionEditModal.tsx
│  │  ├─ characterUpdateHp/
│  │  │  └─ ui/
│  │  │     ├─ __tests__/
│  │  │     └─ HPControlModal.tsx
│  │  ├─ chat/
│  │  │  └─ model/
│  │  │     ├─ contexts/
│  │  │     │  ├─ __tests__/
│  │  │     │  │  └─ ChatContext.test.tsx
│  │  │     │  └─ ChatContext.tsx
│  │  │     ├─ hooks/
│  │  │     │  ├─ __tests__/
│  │  │     │  │  └─ useChatState.test.ts
│  │  │     │  └─ useChatState.ts
│  │  │     ├─ lib/
│  │  │     │  └─ chatCommandParser.ts
│  │  │     └─ schemas/
│  │  │        └─ chatCommands.schema.ts
│  │  ├─ diceRolling/
│  │  │  ├─ lib/
│  │  │  │  ├─ __tests__/
│  │  │  │  │  └─ diceUtils.test.ts
│  │  │  │  └─ diceUtils.ts
│  │  │  ├─ model/
│  │  │  │  └─ hooks/
│  │  │  │     └─ useDiceRoller.ts
│  │  │  ├─ ui/
│  │  │  │  ├─ __tests__/
│  │  │  │  │  └─ DiceRollPopover.test.tsx
│  │  │  │  └─ DiceRollPopover.tsx
│  │  │  └─ index.ts
│  │  ├─ layoutControls/
│  │  │  └─ model/
│  │  │     ├─ contexts/
│  │  │     │  ├─ __tests__/
│  │  │     │  │  └─ UIProvider.test.tsx
│  │  │     │  └─ UIProvider.tsx
│  │  │     └─ hooks/
│  │  │        ├─ __tests__/
│  │  │        │  └─ useUIState.test.ts
│  │  │        └─ useUIState.ts
│  │  ├─ modalManager/
│  │  │  └─ model/
│  │  │     ├─ contexts/
│  │  │     │  └─ ModalProvider.tsx
│  │  │     └─ hooks/
│  │  │        ├─ __tests__/
│  │  │        │  └─ useModalStateManagement.test.ts
│  │  │        └─ useModalStateManagement.ts
│  │  ├─ toggleSidebar/
│  │  │  └─ ui/
│  │  │     └─ ToggleSidebarButton.tsx
│  │  └─ tokenDrag/
│  │     └─ model/
│  │        └─ hooks/
│  ├─ pages/
│  │  └─ GameBoardPage.tsx
│  ├─ shared/
│  │  ├─ api/
│  │  │  └─ types.ts
│  │  ├─ assets/
│  │  │  ├─ sounds/
│  │  │  │  └─ rollNotification.wav
│  │  │  ├─ browsers.svg
│  │  │  ├─ caret-left.svg
│  │  │  ├─ caret-right.svg
│  │  │  ├─ chat.svg
│  │  │  ├─ d20.png
│  │  │  ├─ defaultToken.png
│  │  │  ├─ detach-svgrepo-com.svg
│  │  │  ├─ dots-three-vertical.svg
│  │  │  ├─ hand.svg
│  │  │  ├─ identification-card.svg
│  │  │  ├─ minus.svg
│  │  │  ├─ navigation-arrow.svg
│  │  │  ├─ pencil.svg
│  │  │  ├─ plus-circle.svg
│  │  │  ├─ ruler.svg
│  │  │  ├─ square.svg
│  │  │  ├─ trash.svg
│  │  │  └─ x.svg
│  │  ├─ config/
│  │  │  ├─ constants.ts
│  │  │  └─ sheetDefaults.ts
│  │  ├─ lib/
│  │  │  ├─ hooks/
│  │  │  │  ├─ __tests__/
│  │  │  │  │  ├─ useCommandHistory.test.ts
│  │  │  │  │  └─ useDismissable.test.tsx
│  │  │  │  ├─ useCommandHistory.ts
│  │  │  │  └─ useDismissable.ts
│  │  │  └─ utils/
│  │  │     ├─ __tests__/
│  │  │     │  ├─ characterUtils.test.ts
│  │  │     │  ├─ cn.test.ts
│  │  │     │  ├─ hpUtils.test.ts
│  │  │     │  └─ nameUtils.test.ts
│  │  │     ├─ board/
│  │  │     │  └─ boardUtils.ts
│  │  │     ├─ id/
│  │  │     │  ├─ __tests__/
│  │  │     │  │  └─ idUtils.test.ts
│  │  │     │  └─ idUtils.ts
│  │  │     ├─ object/
│  │  │     │  └─ objectUtils.ts
│  │  │     ├─ cn.ts
│  │  │     ├─ hpUtils.ts
│  │  │     └─ nameUtils.ts
│  │  └─ ui/
│  │     ├─ __tests__/
│  │     │  ├─ ConfirmationModal.test.tsx
│  │     │  ├─ icons.test.tsx
│  │     │  ├─ OptionsPopover.test.tsx
│  │     │  ├─ TabButton.test.tsx
│  │     │  ├─ ToolbarButton.test.tsx
│  │     │  └─ ToolbarPopoverButton.test.tsx
│  │     ├─ ConfirmationModal.tsx
│  │     ├─ Icons.tsx
│  │     ├─ InteractiveModal.tsx
│  │     ├─ Modal.tsx
│  │     ├─ OptionsPopover.tsx
│  │     ├─ TabButton.tsx
│  │     ├─ ToolbarButton.tsx
│  │     └─ ToolbarPopoverButton.tsx
│  ├─ widgets/
│  │  ├─ charactersPanel/
│  │  │  └─ ui/
│  │  │     └─ CharactersPanel.tsx
│  │  ├─ chatPanel/
│  │  │  ├─ lib/
│  │  │  │  ├─ __tests__/
│  │  │  │  │  └─ chatCommands.test.ts
│  │  │  │  └─ chatCommands.ts
│  │  │  └─ ui/
│  │  │     ├─ __tests__/
│  │  │     │  └─ ChatCommandPopover.test.tsx
│  │  │     ├─ ChatCommandPopover.tsx
│  │  │     ├─ ChatInput.tsx
│  │  │     ├─ ChatPanel.tsx
│  │  │     └─ MessageList.tsx
│  │  ├─ gameBoard/
│  │  │  ├─ model/
│  │  │  │  ├─ contexts/
│  │  │  │  │  ├─ GameBoardContext.tsx
│  │  │  │  │  └─ GameBoardInteractionContext.tsx
│  │  │  │  └─ hooks/
│  │  │  │     ├─ useGameBoardEvents.ts
│  │  │  │     └─ useGameBoardInteraction.ts
│  │  │  └─ ui/
│  │  │     ├─ BoardTokenLayer.tsx
│  │  │     ├─ GameBoard.tsx
│  │  │     ├─ GameBoardContent.tsx
│  │  │     ├─ GameBoardSideOption.tsx
│  │  │     ├─ GridLayer.tsx
│  │  │     └─ HPModalRenderer.tsx
│  │  ├─ modalManager/
│  │  │  └─ ui/
│  │  │     └─ ModalManager.tsx
│  │  ├─ rightSidebar/
│  │  │  └─ ui/
│  │  │     ├─ RightSidebar.tsx
│  │  │     ├─ RightSidebarContent.tsx
│  │  │     └─ SidebarTabs.tsx
│  │  ├─ sheetModal/
│  │  │  ├─ model/
│  │  │  │  └─ contexts/
│  │  │  │     └─ SheetContext.tsx
│  │  │  └─ ui/
│  │  │     └─ SheetModal.tsx
│  │  └─ toolBar/
│  │     ├─ model/
│  │     │  └─ hooks/
│  │     │     └─ useToolbarState.ts
│  │     └─ ui/
│  │        ├─ __tests__/
│  │        │  └─ Toolbar.test.tsx
│  │        └─ Toolbar.tsx
│  └─ README.md
├─ .dependency-cruiser.cjs
├─ .gitignore
├─ depcruise.md
├─ dependency-graph.json
├─ eslint.config.js
├─ index.html
├─ jest.config.ts
├─ jest.setup.ts
├─ package-lock.json
├─ package.json
├─ README.md
├─ tailwind.config.ts
├─ todo.md
├─ TREE.md
├─ tsconfig.app.json
├─ tsconfig.json
├─ tsconfig.node.json
└─ vite.config.ts
