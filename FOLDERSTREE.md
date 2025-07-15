NIHILVTT/
├─ src/
│ ├─ app/
│ │ ├─ styles/
│ │ │ └─ index.css
│ │ ├─ App.tsx
│ │ ├─ custom.d.ts
│ │ ├─ index.tsx
│ │ └─ vite-env.d.ts
│ ├─ entities/
│ │ ├─ board/
│ │ │ ├─ model/
│ │ │ │ └─ store.ts
│ │ │ └─ ui/
│ │ │ └─ ZoomControls.tsx
│ │ ├─ character/
│ │ │ ├─ lib/
│ │ │ │ └─ utils/
│ │ │ │ └─ characterUtils.ts
│ │ │ ├─ model/
│ │ │ │ ├─ hooks/
│ │ │ │ │ └─ useCharacterSheetForm.ts
│ │ │ │ ├─ schemas/
│ │ │ │ │ └─ character.schema.ts
│ │ │ │ └─ store.ts
│ │ │ └─ ui/
│ │ │ ├─ playerSheet/
│ │ │ │ ├─ configTab/
│ │ │ │ │ └─ PlayerSheetConfigTab.tsx
│ │ │ │ ├─ detailsTab/
│ │ │ │ │ └─ PlayerSheetDetailsTab.tsx
│ │ │ │ ├─ principalTab/
│ │ │ │ │ ├─ AttributeBlock.tsx
│ │ │ │ │ ├─ CombatStats.tsx
│ │ │ │ │ ├─ FeaturesAndTraits.tsx
│ │ │ │ │ ├─ HealthSection.tsx
│ │ │ │ │ ├─ PrincipalAttributesAndSkills.tsx
│ │ │ │ │ ├─ PrincipalHeader.tsx
│ │ │ │ │ ├─ PrincipalHealthAndCombat.tsx
│ │ │ │ │ ├─ PrincipalTab.tsx
│ │ │ │ │ └─ SkillProficiencyItem.tsx
│ │ │ │ ├─ PlayerSheetContent.tsx
│ │ │ │ └─ PlayerSheetTabs.tsx
│ │ │ ├─ CharacterTemplateListItem.tsx
│ │ │ └─ CreatureSheet.tsx
│ │ └─ token/
│ │ ├─ model/
│ │ │ ├─ hooks/
│ │ │ │ └─ useTokenDrag.ts
│ │ │ └─ store/
│ │ │ ├─ selectedTokenStore.ts
│ │ │ └─ tokenStore.ts
│ │ └─ ui/
│ │ ├─ BoardToken.tsx
│ │ ├─ HealthBar.tsx
│ │ └─ TokenVisual.tsx
│ ├─ features/
│ │ ├─ boardMarqueeSelection/
│ │ │ ├─ model/
│ │ │ │ └─ hooks/
│ │ │ │ └─ useMarqueeSelection.ts
│ │ │ └─ ui/
│ │ │ └─ MarqueeLayer.tsx
│ │ ├─ boardRuler/
│ │ │ ├─ model/
│ │ │ │ └─ hooks/
│ │ │ │ └─ useRuler.ts
│ │ │ ├─ ui/
│ │ │ │ ├─ **tests**/
│ │ │ │ │ └─ RulerPopover.test.tsx
│ │ │ │ ├─ RulerLayer.tsx
│ │ │ │ └─ RulerPopover.tsx
│ │ │ └─ index.ts
│ │ ├─ boardSettings/
│ │ │ ├─ contexts/
│ │ │ │ └─ **tests**/
│ │ │ │ └─ BoardSettingsContext.test.tsx
│ │ │ ├─ hooks/
│ │ │ │ └─ **tests**/
│ │ │ │ └─ useBoardSettingsState.test.ts
│ │ │ ├─ model/
│ │ │ │ └─ store.ts
│ │ │ └─ ui/
│ │ │ ├─ PageSettingsButton.tsx
│ │ │ └─ PageSettingsModal.tsx
│ │ ├─ characterCreation/
│ │ │ ├─ model/
│ │ │ │ ├─ hooks/
│ │ │ │ │ └─ useCharacterCreation.ts
│ │ │ │ └─ schemas/
│ │ │ │ └─ simpleName.schema.ts
│ │ │ └─ ui/
│ │ │ └─ SimpleNameModal.tsx
│ │ ├─ characterDropOnBoard/
│ │ │ └─ model/
│ │ │ └─ hooks/
│ │ │ └─ useCharacterDrop.ts
│ │ ├─ characterEditAction/
│ │ │ └─ ui/
│ │ │ └─ ActionEditModal.tsx
│ │ ├─ characterUpdateHp/
│ │ │ └─ ui/
│ │ │ └─ HPControlModal.tsx
│ │ ├─ chat/
│ │ │ └─ model/
│ │ │ ├─ hooks/
│ │ │ │ └─ **tests**/
│ │ │ │ └─ useChatState.test.ts
│ │ │ ├─ chatCommandParser.ts
│ │ │ ├─ chatCommands.schema.ts
│ │ │ └─ store.ts
│ │ ├─ diceRolling/
│ │ │ ├─ lib/
│ │ │ │ ├─ **tests**/
│ │ │ │ │ └─ diceUtils.test.ts
│ │ │ │ └─ diceUtils.ts
│ │ │ ├─ model/
│ │ │ │ └─ hooks/
│ │ │ │ └─ useDiceRoller.ts
│ │ │ ├─ ui/
│ │ │ │ ├─ **tests**/
│ │ │ │ │ └─ DiceRollPopover.test.tsx
│ │ │ │ └─ DiceRollPopover.tsx
│ │ │ └─ index.ts
│ │ ├─ layoutControls/
│ │ │ └─ model/
│ │ │ └─ store.ts
│ │ ├─ modalManager/
│ │ │ └─ model/
│ │ │ ├─ **tests**/
│ │ │ │ └─ modalStore.test.ts
│ │ │ └─ store.ts
│ │ └─ toggleSidebar/
│ │ └─ ui/
│ │ └─ ToggleSidebarButton.tsx
│ ├─ pages/
│ │ └─ GameBoardPage.tsx
│ ├─ shared/
│ │ ├─ api/
│ │ │ └─ types.ts
│ │ ├─ assets/
│ │ │ ├─ sounds/
│ │ │ │ └─ rollNotification.wav
│ │ │ ├─ browsers.svg
│ │ │ ├─ caret-left.svg
│ │ │ ├─ caret-right.svg
│ │ │ ├─ chat.svg
│ │ │ ├─ d20.png
│ │ │ ├─ defaultToken.png
│ │ │ ├─ detach-svgrepo-com.svg
│ │ │ ├─ dots-three-vertical.svg
│ │ │ ├─ hand.svg
│ │ │ ├─ identification-card.svg
│ │ │ ├─ minus.svg
│ │ │ ├─ navigation-arrow.svg
│ │ │ ├─ pencil.svg
│ │ │ ├─ plus-circle.svg
│ │ │ ├─ ruler.svg
│ │ │ ├─ square.svg
│ │ │ ├─ trash.svg
│ │ │ └─ x.svg
│ │ ├─ config/
│ │ │ ├─ constants.ts
│ │ │ └─ sheetDefaults.ts
│ │ ├─ lib/
│ │ │ ├─ hooks/
│ │ │ │ ├─ **tests**/
│ │ │ │ │ ├─ useCommandHistory.test.ts
│ │ │ │ │ └─ useDismissable.test.tsx
│ │ │ │ ├─ useCommandHistory.ts
│ │ │ │ └─ useDismissable.ts
│ │ │ └─ utils/
│ │ │ ├─ **tests**/
│ │ │ │ ├─ characterUtils.test.ts
│ │ │ │ ├─ cn.test.ts
│ │ │ │ ├─ hpUtils.test.ts
│ │ │ │ └─ nameUtils.test.ts
│ │ │ ├─ board/
│ │ │ │ └─ boardUtils.ts
│ │ │ ├─ id/
│ │ │ │ ├─ **tests**/
│ │ │ │ │ └─ idUtils.test.ts
│ │ │ │ └─ idUtils.ts
│ │ │ ├─ object/
│ │ │ │ └─ objectUtils.ts
│ │ │ ├─ cn.ts
│ │ │ ├─ hpUtils.ts
│ │ │ └─ nameUtils.ts
│ │ └─ ui/
│ │ ├─ **tests**/
│ │ │ ├─ ConfirmationModal.test.tsx
│ │ │ ├─ icons.test.tsx
│ │ │ ├─ OptionsPopover.test.tsx
│ │ │ ├─ TabButton.test.tsx
│ │ │ ├─ ToolbarButton.test.tsx
│ │ │ └─ ToolbarPopoverButton.test.tsx
│ │ ├─ ConfirmationModal.tsx
│ │ ├─ Icons.tsx
│ │ ├─ InteractiveModal.tsx
│ │ ├─ Modal.tsx
│ │ ├─ OptionsPopover.tsx
│ │ ├─ TabButton.tsx
│ │ ├─ ToolbarButton.tsx
│ │ └─ ToolbarPopoverButton.tsx
│ ├─ widgets/
│ │ ├─ charactersPanel/
│ │ │ └─ ui/
│ │ │ └─ CharactersPanel.tsx
│ │ ├─ chatPanel/
│ │ │ ├─ lib/
│ │ │ │ ├─ **tests**/
│ │ │ │ │ └─ chatCommands.test.ts
│ │ │ │ └─ chatCommands.ts
│ │ │ └─ ui/
│ │ │ ├─ **tests**/
│ │ │ │ └─ ChatCommandPopover.test.tsx
│ │ │ ├─ ChatCommandPopover.tsx
│ │ │ ├─ ChatInput.tsx
│ │ │ ├─ ChatPanel.tsx
│ │ │ └─ MessageList.tsx
│ │ ├─ gameBoard/
│ │ │ ├─ model/
│ │ │ │ └─ hooks/
│ │ │ │ ├─ useGameBoardEvents.ts
│ │ │ │ └─ useGameBoardInteraction.ts
│ │ │ └─ ui/
│ │ │ ├─ BoardTokenLayer.tsx
│ │ │ ├─ GameBoard.tsx
│ │ │ ├─ GameBoardContent.tsx
│ │ │ ├─ GameBoardSideOption.tsx
│ │ │ ├─ GridLayer.tsx
│ │ │ └─ HPModalRenderer.tsx
│ │ ├─ modalManager/
│ │ │ └─ ui/
│ │ │ └─ ModalManager.tsx
│ │ ├─ rightSidebar/
│ │ │ └─ ui/
│ │ │ ├─ RightSidebar.tsx
│ │ │ ├─ RightSidebarContent.tsx
│ │ │ └─ SidebarTabs.tsx
│ │ ├─ sheetModal/
│ │ │ └─ ui/
│ │ │ └─ SheetModal.tsx
│ │ └─ toolBar/
│ │ ├─ model/
│ │ │ └─ hooks/
│ │ │ └─ useToolbarState.ts
│ │ └─ ui/
│ │ ├─ **tests**/
│ │ │ └─ Toolbar.test.tsx
│ │ └─ Toolbar.tsx
│ └─ README.md
├─ .dependency-cruiser.cjs
├─ .gitignore
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
