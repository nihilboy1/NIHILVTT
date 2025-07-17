NIHILVTT/
├─ src/
│  ├─ app/
│  │  ├─ styles/
│  │  │  └─ index.css
│  │  ├─ App.tsx
│  │  ├─ custom.d.ts
│  │  ├─ index.tsx
│  │  ├─ router.tsx
│  │  └─ vite-env.d.ts
│  ├─ entities/
│  │  ├─ board/
│  │  │  ├─ model/
│  │  │  │  └─ store.ts
│  │  │  └─ ui/
│  │  ├─ character/
│  │  │  ├─ lib/
│  │  │  │  └─ utils/
│  │  │  │     ├─ __tests__/
│  │  │  │     │  └─ characterUtils.test.ts
│  │  │  │     └─ characterUtils.ts
│  │  │  ├─ model/
│  │  │  │  ├─ hooks/
│  │  │  │  │  └─ useCharacterSheetForm.ts
│  │  │  │  ├─ schemas/
│  │  │  │  │  └─ character.schema.ts
│  │  │  │  └─ store.ts
│  │  │  └─ ui/
│  │  │     └─ CharacterCard.tsx
│  │  └─ token/
│  │     ├─ model/
│  │     │  ├─ hooks/
│  │     │  │  └─ useTokenDrag.ts
│  │     │  └─ store/
│  │     │     ├─ selectedTokenStore.ts
│  │     │     └─ tokenStore.ts
│  │     └─ ui/
│  │        ├─ BoardToken.tsx
│  │        ├─ HealthBar.tsx
│  │        └─ TokenVisual.tsx
│  ├─ features/
│  │  ├─ auth/
│  │  │  ├─ model/
│  │  │  │  ├─ authLocalStorage.ts
│  │  │  │  ├─ authSchemas.ts
│  │  │  │  ├─ authSlice.ts
│  │  │  │  └─ authStore.ts
│  │  │  └─ ui/
│  │  │     ├─ ChangePasswordModal/
│  │  │     │  ├─ ChangePasswordModal.tsx
│  │  │     │  └─ index.ts
│  │  │     └─ ProtectedRoute.tsx
│  │  ├─ boardMarqueeSelection/
│  │  │  ├─ model/
│  │  │  │  └─ hooks/
│  │  │  │     └─ useMarqueeSelection.ts
│  │  │  └─ ui/
│  │  │     └─ MarqueeLayer.tsx
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
│  │  │  │  └─ __tests__/
│  │  │  │     └─ BoardSettingsContext.test.tsx
│  │  │  ├─ hooks/
│  │  │  │  └─ __tests__/
│  │  │  │     └─ useBoardSettingsState.test.ts
│  │  │  ├─ model/
│  │  │  │  └─ store.ts
│  │  │  └─ ui/
│  │  │     ├─ PageSettingsButton.tsx
│  │  │     └─ PageSettingsModal.tsx
│  │  ├─ boardZoom/
│  │  │  ├─ model/
│  │  │  │  └─ store.ts
│  │  │  └─ ui/
│  │  │     └─ ZoomControls.tsx
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
│  │  │     └─ HPControlModal.tsx
│  │  ├─ chat/
│  │  │  └─ model/
│  │  │     ├─ hooks/
│  │  │     │  └─ __tests__/
│  │  │     │     └─ useChatState.test.ts
│  │  │     ├─ chatCommandParser.ts
│  │  │     ├─ chatCommands.schema.ts
│  │  │     └─ store.ts
│  │  ├─ diceRolling/
│  │  │  ├─ lib/
│  │  │  │  ├─ __tests__/
│  │  │  │  │  └─ diceUtils.test.ts
│  │  │  │  └─ diceUtils.ts
│  │  │  ├─ model/
│  │  │  │  ├─ hooks/
│  │  │  │  └─ store.ts
│  │  │  ├─ ui/
│  │  │  │  ├─ __tests__/
│  │  │  │  │  └─ DiceRollPopover.test.tsx
│  │  │  │  └─ DiceRollPopover.tsx
│  │  │  └─ index.ts
│  │  ├─ layoutControls/
│  │  │  └─ model/
│  │  │     └─ store.ts
│  │  ├─ modalManager/
│  │  │  └─ model/
│  │  │     ├─ __tests__/
│  │  │     │  └─ modalStore.test.ts
│  │  │     └─ store.ts
│  │  ├─ toggleSidebar/
│  │  │  └─ ui/
│  │  │     └─ ToggleSidebarButton.tsx
│  │  └─ userEdit/
│  │     └─ ui/
│  │        └─ EditProfileModal/
│  │           └─ EditProfileModal.tsx
│  ├─ pages/
│  │  ├─ CampaignsPage.tsx
│  │  ├─ DashboardPage.tsx
│  │  ├─ HomePage.tsx
│  │  ├─ LoginPage.tsx
│  │  ├─ RegisterPage.tsx
│  │  └─ SessionPage.tsx
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
│  │     ├─ Spinner/
│  │     │  └─ Spinner.tsx
│  │     ├─ ConfirmationModal.tsx
│  │     ├─ FormInput.tsx
│  │     ├─ Icons.tsx
│  │     ├─ InteractiveModal.tsx
│  │     ├─ Modal.tsx
│  │     ├─ OptionsPopover.tsx
│  │     ├─ SquaresBackground.tsx
│  │     ├─ TabButton.tsx
│  │     ├─ ToolbarButton.tsx
│  │     └─ ToolbarPopoverButton.tsx
│  ├─ widgets/
│  │  ├─ characterSheet/
│  │  │  ├─ monsterNpcSheet/
│  │  │  │  └─ MonsterNpcSheet.tsx
│  │  │  └─ playerSheet/
│  │  │     ├─ configTab/
│  │  │     │  └─ PlayerSheetConfigTab.tsx
│  │  │     ├─ detailsTab/
│  │  │     │  └─ PlayerSheetDetailsTab.tsx
│  │  │     ├─ principalTab/
│  │  │     │  ├─ AttributeBlock.tsx
│  │  │     │  ├─ CombatStats.tsx
│  │  │     │  ├─ HealthSection.tsx
│  │  │     │  ├─ PrincipalAttributesAndSkills.tsx
│  │  │     │  ├─ PrincipalHeader.tsx
│  │  │     │  ├─ PrincipalHealthAndCombat.tsx
│  │  │     │  └─ SkillProficiencyItem.tsx
│  │  │     ├─ AttributesWidget.tsx
│  │  │     ├─ HealthAndCombatWidget.tsx
│  │  │     ├─ PlayerSheetContent.tsx
│  │  │     ├─ PlayerSheetTabs.tsx
│  │  │     └─ PrincipalTab.tsx
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
│  │  ├─ profileModal/
│  │  │  ├─ index.ts
│  │  │  └─ ProfileModal.tsx
│  │  ├─ rightSidebar/
│  │  │  └─ ui/
│  │  │     ├─ RightSidebar.tsx
│  │  │     ├─ RightSidebarContent.tsx
│  │  │     └─ SidebarTabs.tsx
│  │  ├─ sheetModal/
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
├─ dependency-graph.json
├─ eslint.config.js
├─ FOLDERSTREE.md
├─ index.html
├─ jest.config.ts
├─ jest.setup.ts
├─ package-lock.json
├─ package.json
├─ README.md
├─ tailwind.config.ts
├─ todo.md
├─ tsconfig.app.json
├─ tsconfig.json
├─ tsconfig.node.json
└─ vite.config.ts
