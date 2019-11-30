(function (w) {
    'use strict'
    // modify the data here to your liking
    let app_data = {
            "github-repo": "robin840211/swskillsimu_unofficial", // Set to null to let auto-detect from Github Page default URL, unreliable though
            maxCharacterLevel: 68 // Default max level will be used if the value cannot be found in a character's JSON data
        },
        // SP table.
        table_SkillPoint = {
            // Default SP for level up that is not found within the "Special" below
            DefaultSP: 2,

            // Special cases, specify an amount of SP to receive on these character levels
            Special: {
                // Should be all numbers, putting anything else at your own risk.
                // The format is: `[number] Level: [number] The amount of SP`
                0: 0,
                1: 0,
                2: 0,
                3: 0,
                4: 1,
                5: 3,
                6: 1,
                7: 1,
                8: 1,
                9: 1,
                10: 5,
                15: 5,
                20: 10,
                25: 5,
                30: 5,
                35: 5,
                40: 10,
                45: 5,
                50: 5,
                55: 5,
                60: 5,
                61: 1,
                62: 1,
                63: 1,
                64: 1,
                65: 3,
                66: 1,
                67: 1,
                68: 1
            }
        },
        table_Character = {
            /*
            Should be as format below, putting anything else at your own risk.
            The format is: `[string] Character Name: [object] character property`
            + Character Name: Full name prefered, but can be anything.
            + Character property object contains 4 properties: ("enabled" can be omitted, "reason" can be omitted)
                                         url: The relative URL to the character's skill tree simulator page.
                                         selectImage: The big image of character selection on skill simulator's homepage.
                                                      Can be `null` to not use any image but doing so at your own risk
                                         enabled: Determine if the character is allowed to access or not. Default: true
                                                  (for example: the skill tree of said character is in building)
                                         reason: The reason when not enabled
            */
            "哈露・伊絲提亞": {
                url: "Haru",
                selectImage: "assets/images/Select_A_Haru.png"
            },
            "歐文・阿克萊特": {
                url: "Erwin",
                selectImage: "assets/images/Select_B_Erwin.png"
            },
            "莉莉・普露梅茜": {
                url: "Lily",
                selectImage: "assets/images/Select_C_Lily.png"
            },
            "史黛菈・優妮貝爾": {
                url: "Stella",
                selectImage: "assets/images/Select_E_Stella.png"
            },
            "金・希帕斯": {
                url: "Jin",
                selectImage: "assets/images/Select_D_Jin.png"
            },
            "伊莉絲・悠娜": {
                url: "Iris",
                selectImage: "assets/images/Select_F_Iris.png"
            },
            "琪・阿露爾": {
                url: "Chii",
                selectImage: "assets/images/Select_G_Chii.png"
            },
            "艾芙奈爾": {
                url: "Ephnel",
                selectImage: "assets/images/SomeoneSelect.png",
                enabled: false,
                reason: "尚未釋出，敬請期待！"
            }
            /*
            },
            "??????": {
                url: "someone",
                selectImage: "assets/images/SomeoneSelect.png",
                enabled: false,
                reason: "尚未釋出，敬請期待！"
            }
            */
        };

    // Debug purpose. Don't modify unless you know what're you doing or testing something
    let debug_data = {
        use_h264: null, // False to force disable H264, true to force using H264, null to "use H264 if the web browser support it"
        use_vp9: null, // False to force disable VP9, true to force using VP9, null to "use VP9 if the web browser support it"
        videoPreviewPanelHeight: "170px" // The height of the panel which contains skill preview video
    };

    // Do not modify anything below this line

    if (!app_data["github-repo"]) {
        // This whole thing is untested, trust auto-detect at your own risk
        let currentHost = w.document.location.hostname;
        if (currentHost.endsWith("github.io")) {
            let username = currentHost.substring(0, currentHost.length - ".github.io".length),
                repoName = w.document.location.pathname;
            if (repoName === "/") {
                repoName = w.document.location.hostname;
            } else {
                repoName = repoName.ctrim("\/");
                let slashFound = repoName.indexOf("/");
                if (slashFound !== -1) {
                    repoName = repoName.substr(0, slashFound);
                }
            }
            app_data["github-repo"] = username + "/" + repoName;
        } else {
            delete app_data["github-repo"];
        }
    }

    let skillTreeData;
    if (!w.hasOwnProperty("SkillTreeData")) {
        skillTreeData = {};
        Object.defineProperty(w, "SkillTreeData", {
            value: skillTreeData,
            configurable: false,
            enumerable: true,
            writable: false
        });
    } else {
        skillTreeData = w.SkillTreeData;
    }

    Object.defineProperty(skillTreeData, "SkillPointTable", {
        value: deepFreeze(table_SkillPoint),
        configurable: false,
        enumerable: true,
        writable: false
    });

    Object.defineProperty(skillTreeData, "CharacterTable", {
        value: deepFreeze(table_Character),
        configurable: false,
        enumerable: true,
        writable: false
    });

    if (typeof (w.appdata) !== "object") {
        Object.defineProperty(w, "appdata", {
            value: Object.freeze(Object.assign({
                "github-repo": "robin840211/swskillsimu_unofficial",
                maxCharacterLevel: 75,
                use_h264: null,
                use_vp9: null,
                videoPreviewPanelHeight: "170px"
            }, app_data, debug_data)),
            writable: false,
            configurable: false
        });
    }
})(window);