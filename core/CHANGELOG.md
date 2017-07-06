## [v0.0.1-beta.0](https://github.com/OpusCapita/fsm/compare/null...v0.0.1-beta.0) (Thu, 06 Jul 2017 11:15:15 GMT)
 - Add release .scripts (Kirill Volkovich <volkovich@scand.com>, a1d05bb)
 - Revert babel-* dependencies to 6.x.x (Kirill Volkovich <volkovich@scand.com>, 660f5f6)
 - #10 Implement build process for "task-manager"
    
    Add [npm-scripts](https://www.npmjs.com/package/@opuscapita/npm-scripts)
    Add changelog generation
    Build sources to bundles (Kirill Volkovich <volkovich@scand.com>, d735124)
 - #10 Implement build process for "core"
    
    Add [npm-scripts](https://www.npmjs.com/package/@opuscapita/npm-scripts)
    Add changelog generation
    Build sources to bundles (Kirill Volkovich <volkovich@scand.com>, 10924b3)
 - Update README.md (Alexey Sergeev <asergeev-sc@users.noreply.github.com>, ac3c10a)
 - Adding support for node modules that are installed as symlinks (Alexey Sergeev <sab@scand.com>, abb0193)
 - Using banel-node with required plugins to statup application (Alexey Sergeev <sab@scand.com>, 7cccf6c)
 - Adding code coverage into fsm core with 100% check (Alexey Sergeev <sab@scand.com>, 0e9dcab)
 - Create README.md (Alexey Sergeev <asergeev-sc@users.noreply.github.com>, 61195e2)
 - Create README.md (Alexey Sergeev <asergeev-sc@users.noreply.github.com>, c986181)
 - Create README.md (Alexey Sergeev <asergeev-sc@users.noreply.github.com>, c360311)
 - Changing node version for build. (Daniel Zhitomirsky <dzhitomirsky-sc@users.noreply.github.com>, 7672d6a)
 - Enhancement/4 (#8)
    
    Replacing isFinal({ state }) with isInFinalState({ object }) in Machine (#4) (Alexey Sergeev <asergeev-sc@users.noreply.github.com>, 8d56d8c)
 - Refactoring code. Removing usage of Set that can't be trabsformed by Babel to ES5 whithout additional transformers (Alexey Sergeev <sab@scand.com>, ce774f5)
 - Returning link to CircleCI (Alexey Sergeev <sab@scand.com>, 87a0a2d)
 - Restructuring docuemtnation. Set up correct module names, repository url. Adding LICENSE (Alexey Sergeev <sab@scand.com>, 1a7ac2d)
 - Create README.md (Alexey Sergeev <asergeev-sc@users.noreply.github.com>, ba2ecf8)
 - Cicrcle ci
    
    * Added circle file and mocha junit test format reporter.
    
    * Added missing file.
    
    * Fixed import for case-sencitive OS.
    
    * Changed circle file.
    
    * Changed circle file.
    
    * Changed circle file.
    
    * Added circleCi badge to readme.md.
    
    * Failed test.
    
    * Ok test.
    
    * Prepare for PR.
    
    * Update package.json
    
    Adding base build process config for CircleCI #7 (Daniel Zhitomirsky <dzhitomirsky-sc@users.noreply.github.com>, 53b5214)
 - Updating documentation (Alexey Sergeev <sab@scand.com>, 41beade)
 - Updating docuemntation (Alexey Sergeev <sab@scand.com>, 7e42ac9)
 - Updating documentation (Alexey Sergeev <sab@scand.com>, 8fa6745)
 - Adjusted doc. (Daniel Zhitomirsky <dzhitomirsky-sc@users.noreply.github.com>, 1f3f31b)
 - Fixed md syntax in Readme (Daniel Zhitomirsky <dzhitomirsky-sc@users.noreply.github.com>, 52f08d0)
 - Updating library references (Alexey Sergeev <sab@scand.com>, fda5c7c)
 - Uddating README file (Alexey Sergeev <sab@scand.com>, 3cd6974)
 - Uddating README file (Alexey Sergeev <sab@scand.com>, 8631364)
 - Fixing code style (Alexey Sergeev <sab@scand.com>, e76b878)
 - Merge branch 'feature/task-manager' (3f04a05 b494c83, 49832e6)
 - restructuring sources (Alexey Sergeev <sab@scand.com>, b494c83)
 - Merge branch 'master' into feature/task-manager (35cc0bf 616f291, ef7080d)
 - Refactoring code. Restructuring modules/folder/file structure (Alexey Sergeev <sab@scand.com>, 35cc0bf)
 - Reverting wrong code changes (Alexey Sergeev <sab@scand.com>, b2b4806)
 - Update actionsAndConditions.md (Alexey Sergeev <asergeev-sc@users.noreply.github.com>, 3f04a05)
 - Update actionsAndConditions.md (Alexey Sergeev <asergeev-sc@users.noreply.github.com>, 10e6e43)
 - Update actionsAndConditions.md (Alexey Sergeev <asergeev-sc@users.noreply.github.com>, eb019aa)
 - Update actionsAndConditions.md (Alexey Sergeev <asergeev-sc@users.noreply.github.com>, c02ae6b)
 - Adding ideas about FSM actions/guards/conditions definition (Alexey Sergeev <sab@scand.com>, 616f291)
 - Inchanced & refactored TaskManager. (dzhitomirsky-sc <dzhitomirsky@scand.com>, b271c97)
 - Update README.md (Alexey Sergeev <asergeev-sc@users.noreply.github.com>, 066d45c)
 - Adjusted .gitignore. (dzhitomirsky-sc <dzhitomirsky@scand.com>, 775f982)
 - Implemented Task Manager as separate sub-module, added examples, test, docs, etc. (dzhitomirsky-sc <dzhitomirsky@scand.com>, 303ac6b)
 - First version of minitoring task manager. (dzhitomirsky-sc <dzhitomirsky@scand.com>, cae25d2)
 - Implement StateNode and Transition name and description change (Kirill Volkovich <volkovich@scand.com>, 0e6fc49)
 - Fix Viewport bugs (Kirill Volkovich <volkovich@scand.com>, b70d31d)
 - Started implement StateNodeInspector (Kirill Volkovich <volkovich@scand.com>, 74936e5)
 - Improve Inspector (Kirill Volkovich <volkovich@scand.com>, 8186c69)
 - Improve TansitionInspector (Kirill Volkovich <volkovich@scand.com>, ed5a514)
 - Fix weird blinking on transition move (Kirill Volkovich <volkovich@scand.com>, daa9f82)
 - Implement - cancel start create transitions by miss-click on StateNode
    point (Kirill Volkovich <volkovich@scand.com>, 8792b71)
 - Remove listeners on ViewportContainer unmount (Kirill Volkovich <volkovich@scand.com>, 3388e93)
 - Fix state node points highlighting when transition is looped (Kirill Volkovich <volkovich@scand.com>, 408cb05)
 - Improve transitions mouse control (Kirill Volkovich <volkovich@scand.com>, a543eab)
 - Improve transitions mouse control (Kirill Volkovich <volkovich@scand.com>, 956739d)
 - JUST DO IT!!! (Kirill Volkovich <volkovich@scand.com>, d6ac6e1)
 - Rename new-transition duck to transitions-meta (Kirill Volkovich <volkovich@scand.com>, 64d2449)
 - Fix - BezierTransition arrows missing on delete some transition (Kirill Volkovich <volkovich@scand.com>, 7ab6237)
 - fsm-gui: Improved transition creation (Kirill Volkovich <volkovich@scand.com>, e1714b4)
 - Fix transition creating fail (Kirill Volkovich <volkovich@scand.com>, 5aa0cf2)
 - Move 'fsm-gui' application to this repository (Kirill Volkovich <volkovich@scand.com>, 9857fde)
 - Restructuring sources (Alexey Sergeev <sab@scand.com>, 440da09)
 - Restructuring sources (Alexey Sergeev <sab@scand.com>, 22e53fd)
 - Updating documentation (Alexey Sergeev <sab@scand.com>, f33b3a8)
 - Updating documentation (Alexey Sergeev <sab@scand.com>, b4100cf)
 - Updating documentation (Alexey Sergeev <sab@scand.com>, 7afcc74)
 - Updating documentation (Alexey Sergeev <sab@scand.com>, 944e304)
 - Updating documentation (Alexey Sergeev <sab@scand.com>, baa65e5)
 - Updating documentation (Alexey Sergeev <sab@scand.com>, 32e5672)
 - Updating documentation (Alexey Sergeev <sab@scand.com>, 3555ad5)
 - Updating documentation (Alexey Sergeev <sab@scand.com>, 20c6e3d)
 - Updating documentation (Alexey Sergeev <sab@scand.com>, 507411a)
 - Updating documentation (Alexey Sergeev <sab@scand.com>, c26f050)
 - Updating documentation (Alexey Sergeev <sab@scand.com>, 20426c6)
 - Updating documentation (Alexey Sergeev <sab@scand.com>, 00c7059)
 - Updating documentation (Alexey Sergeev <sab@scand.com>, 7537779)
 - Adding more documentation (Alexey Sergeev <sab@scand.com>, b36dc36)
 - Adding possibility to (re)start machine (Alexey Sergeev <sab@scand.com>, 3db6542)
 - clean up a mess console app with form focusing and log output (Alexey Sergeev <sab@scand.com>, ae51f07)
 - Adding is, isFinal, can and cannot methods to machine (Alexey Sergeev <sab@scand.com>, 0b3b473)
 - remove unused import (Alexey Sergeev <sab@scand.com>, 3cc668d)
 - Adding console application that provides possibility to visualize simple workflow and send events to machine (Alexey Sergeev <sab@scand.com>, c17afe7)
 - Removing unused parameter (Alexey Sergeev <sab@scand.com>, c17ec78)
 - Minor changes (Alexey Sergeev <sab@scand.com>, c0d782d)
 - Restucturing doecuemntation files (Alexey Sergeev <sab@scand.com>, 8e0bb47)
 - Update README.md (Alexey Sergeev <asergeev-sc@users.noreply.github.com>, 2873e30)
 - Renaming files (Alexey Sergeev <sab@scand.com>, 51c47a2)
 - Update README.md (Alexey Sergeev <asergeev-sc@users.noreply.github.com>, 544dae4)
 - Update FSMSchemaAndApi.md (Alexey Sergeev <asergeev-sc@users.noreply.github.com>, abc16a7)
 - Fixing code style (Alexey Sergeev <sab@scand.com>, a9d0d8d)
 - Implementing 'sendEvent' funcionality to machine (Alexey Sergeev <sab@scand.com>, f49eb6e)
 - Implmentting MethodDefinition.findAvailableTransitions (Alexey Sergeev <sab@scand.com>, 68a7dc7)
 - Renaming workflow.. to machine.. (Alexey Sergeev <sab@scand.com>, c5f8740)
 - Adding first structures/classes and tests (Alexey Sergeev <sab@scand.com>, 96d81a2)
 - Adding introduction and existing FSM libs analysis (Alexey Sergeev <sab@scand.com>, 907f008)
 - Initial commit (Alexey Sergeev <asergeev-sc@users.noreply.github.com>, 1293ec6)

