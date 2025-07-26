NIHILVTT/
├─ src/
│ ├─ app/
│ │ ├─ styles/
│ │ │ └─ index.css
│ │ ├─ App.tsx
│ │ ├─ custom.d.ts
│ │ ├─ index.tsx
│ │ ├─ router.tsx
│ │ └─ vite-env.d.ts
│ ├─ entities/
│ │ ├─ board/
│ │ │ └─ model/
│ │ │ └─ store.ts
│ │ ├─ character/
│ │ │ ├─ lib/
│ │ │ │ ├─ hooks/
│ │ │ │ │ ├─ useCharacterCalculations.ts
│ │ │ │ │ └─ usePlayerCharacter.ts
│ │ │ │ └─ utils/
│ │ │ │ ├─ **tests**/
│ │ │ │ │ └─ characterUtils.test.ts
│ │ │ │ └─ characterUtils.ts
│ │ │ ├─ model/
│ │ │ │ ├─ hooks/
│ │ │ │ │ └─ useCharacterSheetForm.ts
│ │ │ │ ├─ schemas/
│ │ │ │ │ └─ character.schema.ts
│ │ │ │ └─ store.ts
│ │ │ ├─ ui/
│ │ │ │ └─ CharacterCard.tsx
│ │ │ └─ constants.ts
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
│ │ ├─ auth/
│ │ │ ├─ model/
│ │ │ │ ├─ authLocalStorage.ts
│ │ │ │ ├─ authSchemas.ts
│ │ │ │ ├─ authSlice.ts
│ │ │ │ └─ authStore.ts
│ │ │ └─ ui/
│ │ │ ├─ ChangePasswordModal/
│ │ │ │ └─ ChangePasswordModal.tsx
│ │ │ └─ ProtectedRoute.tsx
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
│ │ ├─ boardZoom/
│ │ │ ├─ model/
│ │ │ │ └─ store.ts
│ │ │ └─ ui/
│ │ │ └─ ZoomControls.tsx
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
│ │ │ │ ├─ hooks/
│ │ │ │ └─ store.ts
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
│ │ │ ├─ authModalStore.ts
│ │ │ ├─ baseModalConfig.ts
│ │ │ └─ sessionModalStore.ts
│ │ ├─ toggleSidebar/
│ │ │ └─ ui/
│ │ │ └─ ToggleSidebarButton.tsx
│ │ └─ userEdit/
│ │ └─ ui/
│ │ └─ EditProfileModal/
│ │ └─ EditProfileModal.tsx
│ ├─ pages/
│ │ ├─ CampaignsPage.tsx
│ │ ├─ DashboardPage.tsx
│ │ ├─ HomePage.tsx
│ │ ├─ LoginPage.tsx
│ │ ├─ RegisterPage.tsx
│ │ └─ SessionPage.tsx
│ ├─ shared/
│ │ ├─ api/
│ │ │ ├─ data/
│ │ │ │ ├─ species_xphb.json
│ │ │ │ ├─ species.json
│ │ │ │ └─ spells.json
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
│ │ │ ├─ MotionAnimations.ts
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
│ │ ├─ FormInput.tsx
│ │ ├─ Icons.tsx
│ │ ├─ InteractiveModal.tsx
│ │ ├─ Modal.tsx
│ │ ├─ MotionLink.tsx
│ │ ├─ OptionsPopover.tsx
│ │ ├─ Spinner.tsx
│ │ ├─ SquaresBackground.tsx
│ │ ├─ TabButton.tsx
│ │ ├─ TermsModal.tsx
│ │ ├─ ToolbarButton.tsx
│ │ └─ ToolbarPopoverButton.tsx
│ ├─ widgets/
│ │ ├─ authModalManager/
│ │ │ └─ ui/
│ │ │ └─ AuthModalManager.tsx
│ │ ├─ characterSheet/
│ │ │ ├─ monsterNpcSheet/
│ │ │ │ └─ MonsterNpcSheet.tsx
│ │ │ └─ playerSheet/
│ │ │ ├─ configTab/
│ │ │ │ └─ PlayerSheetConfigTab.tsx
│ │ │ ├─ detailsTab/
│ │ │ │ └─ PlayerSheetDetailsTab.tsx
│ │ │ ├─ AttributeBlock.tsx
│ │ │ ├─ AttributesAndSkillsList.tsx
│ │ │ ├─ CombatStats.tsx
│ │ │ ├─ HealthAndCombatDetails.tsx
│ │ │ ├─ HealthSection.tsx
│ │ │ ├─ PlayerSheetContent.tsx
│ │ │ ├─ PlayerSheetPrincipalContent.tsx
│ │ │ ├─ PlayerSheetPrincipalTab.tsx
│ │ │ ├─ PlayerSheetTabs.tsx
│ │ │ ├─ PrincipalHeader.tsx
│ │ │ └─ SkillProficiencyItem.tsx
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
│ │ ├─ profileModal/
│ │ │ ├─ index.ts
│ │ │ └─ ProfileModal.tsx
│ │ ├─ rightSidebar/
│ │ │ └─ ui/
│ │ │ ├─ RightSidebar.tsx
│ │ │ ├─ RightSidebarContent.tsx
│ │ │ └─ SidebarTabs.tsx
│ │ ├─ sessionModalManager/
│ │ │ └─ ui/
│ │ │ └─ SessionModalManager.tsx
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
├─ FOLDERSTREE.md
├─ index.html
├─ jest.config.ts
├─ jest.setup.ts
├─ package-lock.json
├─ package.json
├─ prettier.config.js
├─ README.md
├─ tailwind.config.ts
├─ todo.md
├─ tsconfig.app.json
├─ tsconfig.json
├─ tsconfig.node.json
└─ vite.config.ts
