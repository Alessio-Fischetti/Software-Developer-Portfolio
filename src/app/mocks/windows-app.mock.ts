import { WindowsApps } from "../components/interfaces/modal-interface";
import { Folder, AppViews, StartApp } from "../components/interfaces/app-interface";
import { CmdContent } from "../components/pc-version/pc-components/modal-content/cmd-content/cmd-content";
import { CvContent } from "../components/pc-version/pc-components/modal-content/cv-content/cv-content";
import { FileExplorerContent } from "../components/pc-version/pc-components/modal-content/file-explorer-content/file-explorer-content";
import { VscodeContent } from "../components/pc-version/pc-components/modal-content/vscode-content/vscode-content";
import { ContactContent } from "../components/pc-version/pc-components/modal-content/contact-content/contact-content";
import { ImageContent } from "../components/pc-version/pc-components/modal-content/image-content/image-content";
import { AboutMeContent } from "../components/pc-version/pc-components/modal-content/about-me-content/about-me-content";
import { InternetComponent } from "../components/pc-version/pc-components/modal-content/internet-component/internet-component";

export const WINDOWS_APPS_MOCK: WindowsApps = {
    windows_icon: {
        id: 0,
        isOpen: false,
        isMinimized: false,
        isSelected: false,
        maximazed: false,
        onBackground: false,
        dragPosition: { x: 0, y: 0 },
        lastDragPosition: { x: 0, y: 0 },
        appInfo: { image: '', name: 'Start' }
    },
    cmd: {
        id: 1,
        isOpen: true,
        isMinimized: false,
        isSelected: true,
        maximazed: false,
        onBackground: true,
        dragPosition: { x: 694, y: 137 },
        lastDragPosition: { x: 694, y: 137 },
        xSize: '25%',
        lastXSize: '25%',
        ySize: '45%',
        lastYSize: '45%',
        zIndex: 0,
        appInfo: { image: 'assets/icons/cmd.webp', name: 'cmd', modalTitle: 'Software Developer Portfolio' },
        component: CmdContent
    },
    file_explorer: {
        id: 0,
        isOpen: false,
        isMinimized: false,
        isSelected: false,
        maximazed: false,
        onBackground: false,
        dragPosition: { x: 50, y: 50 },
        lastDragPosition: { x: 50, y: 50 },
        xSize: '90%',
        lastXSize: '90%',
        ySize: '80%',
        lastYSize: '80%',
        appInfo: { image: 'assets/icons/File_Explorer.svg', name: 'file_explorer', modalTitle: 'File Explorer' },
        component: FileExplorerContent
    },
    about_me: {
        id: 0,
        isOpen: false,
        isMinimized: false,
        isSelected: false,
        maximazed: false,
        onBackground: false,
        dragPosition: { x: 85, y: 100 },
        lastDragPosition: { x: 85, y: 100 },
        xSize: '90%',
        lastXSize: '90%',
        ySize: '80%',
        lastYSize: '80%',
        appInfo: { image: 'assets/icons/pdf.svg', name: 'about_me', modalTitle: 'About me.pdf', file: 'assets/About_me.pdf' },
        component: AboutMeContent
    },
    cv: {
        id: 0,
        isOpen: false,
        isMinimized: false,
        isSelected: false,
        maximazed: false,
        onBackground: false,
        dragPosition: { x: 90, y: 100 },
        lastDragPosition: { x: 90, y: 100 },
        xSize: '90%',
        lastXSize: '90%',
        ySize: '80%',
        lastYSize: '80%',
        appInfo: { image: 'assets/icons/cv.png', name: 'cv', modalTitle: 'Cv Alessio Fischetti.pdf', file: 'assets/Cv_Alessio_Fischetti.pdf' },
        component: CvContent
    },
    vscode: {
        id: 0,
        isOpen: false,
        isMinimized: false,
        isSelected: false,
        maximazed: false,
        onBackground: false,
        dragPosition: { x: 10, y: 100 },
        lastDragPosition: { x: 10, y: 100 },
        xSize: '90%',
        lastXSize: '90%',
        ySize: '80%',
        lastYSize: '80%',
        appInfo: { image: 'assets/icons/vscode.svg', name: 'vscode', modalTitle: 'Vs Code' },
        component: VscodeContent
    },
    contact_me: {
        id: 0,
        isOpen: false,
        isMinimized: false,
        isSelected: false,
        maximazed: false,
        onBackground: false,
        dragPosition: { x: 20, y: 50 },
        lastDragPosition: { x: 20, y: 50 },
        xSize: '90%',
        lastXSize: '90%',
        ySize: '80%',
        lastYSize: '80%',
        appInfo: { image: 'assets/icons/contact.png', name: 'contact_me', modalTitle: 'Contattami' },
        component: ContactContent
    },
    images: {
        id: 0,
        isOpen: false,
        isMinimized: false,
        isSelected: false,
        maximazed: false,
        onBackground: false,
        dragPosition: { x: 300, y: 50 },
        lastDragPosition: { x: 300, y: 50 },
        xSize: '31%',
        lastXSize: '31%',
        ySize: '80%',
        lastYSize: '80%',
        appInfo: { image: 'assets/imgs/me.webp', name: 'images', modalTitle: 'About me.png', file: 'assets/imgs/me.webp' },
        component: ImageContent
    },
    internet: {
        id: 0,
        isOpen: false,
        isMinimized: false,
        isSelected: false,
        maximazed: false,
        onBackground: false,
        dragPosition: { x: 150, y: 50 },
        lastDragPosition: { x: 150, y: 50 },
        xSize: '80%',
        lastXSize: '80%',
        ySize: '80%',
        lastYSize: '80%',
        appInfo: { image: 'assets/icons/internet.webp', name: 'internet', modalTitle: 'Internet Explorer' },
        component: InternetComponent
    }

};

export const WINDOWS_APPS_CONTENT: Folder[] = [
    {
        folderName: "Desktop",
        isFolderSelected: true,
        folderImg: 'assets/icons/desktop.webp',
        folderContent: [
            {
                appName: 'About me.pdf',
                appImg: 'assets/icons/pdf.svg',
                referenceFolder: 'Desktop',
                fileType: 'about_me',
                component: AboutMeContent
            },
            {
                appName: 'CV Alessio Fischetti.pdf',
                appImg: 'assets/icons/cv.png',
                referenceFolder: 'Desktop',
                component: CvContent,
                fileType: "cv"
            },
            {
                appName: 'Progetti',
                appImg: 'assets/icons/vscode.svg',
                referenceFolder: 'Desktop',
                component: FileExplorerContent,
                fileType: "vscode"
            },
            {
                appName: 'Contattami',
                appImg: 'assets/icons/contact.png',
                referenceFolder: 'Desktop',
                fileType: "contact_me",
                component: ContactContent
            },
            {
                appName: 'About me.png',
                appImg: 'assets/imgs/me.webp',
                referenceFolder: 'Desktop',
                fileType: "images",
                component: ImageContent
            },

        ]
    },
    {
        folderName: "Documenti",
        isFolderSelected: false,
        folderImg: 'assets/icons/documents_folder.webp',
        folderContent: [
            {
                appName: 'About me.pdf',
                appImg: 'assets/icons/pdf.svg',
                referenceFolder: 'Documenti',
                component: AboutMeContent,
                fileType: "about_me"
            },
            {
                appName: 'CV Alessio Fischetti.pdf',
                appImg: 'assets/icons/cv.png',
                referenceFolder: 'Documenti',
                component: CvContent,
                fileType: "cv"
            },
        ]
    },
    {
        folderName: "Download",
        isFolderSelected: false,
        folderImg: 'assets/icons/download.webp',
        folderContent: [
            {
                appName: 'CV Alessio Fischetti.pdf',
                appImg: 'assets/icons/cv.png',
                referenceFolder: 'Download',
                fileType: "cv"
            }
        ]
    },
    {
        folderName: "Immagini",
        isFolderSelected: false,
        folderImg: 'assets/icons/images.webp',
        folderContent: [
            {
                appName: 'About me.png',
                appImg: 'assets/imgs/me.webp',
                referenceFolder: 'Immagini',
                fileType: "images"
            },
        ]
    },
    {
        folderName: "Contatti",
        isFolderSelected: false,
        folderImg: 'assets/icons/contact.png',
        folderContent: [
            {
                appName: 'Contattami',
                appImg: 'assets/icons/contact.png',
                referenceFolder: 'Contatti',
                fileType: "contact_me"
            },
        ]
    }
]

export const WINDOWS_START_APPS: StartApp[] = [
    {
        appName: 'Command Prompt',
        appImg: 'assets/icons/cmd.webp',
        fileType: "cmd",
        open: true
    },
    {
        appName: 'File Explorer',
        appImg: 'assets/icons/File_Explorer.svg',
        fileType: "file_explorer",
        open: false
    },
    {
        appName: 'Internet',
        appImg: 'assets/icons/internet.webp',
        fileType: "internet",
        open: false
    },
    {
        appName: 'About me.pdf',
        appImg: 'assets/icons/pdf.svg',
        fileType: 'about_me',
        open: false
    },
    {
        appName: 'CV Alessio Fischetti.pdf',
        appImg: 'assets/icons/cv.png',
        fileType: "cv",
        open: false
    },
    {
        appName: 'Progetti',
        appImg: 'assets/icons/vscode.svg',
        fileType: "vscode",
        open: false
    },
    {
        appName: 'Contattami',
        appImg: 'assets/icons/contact.png',
        fileType: "contact_me",
        open: false
    },
    {
        appName: 'About me.png',
        appImg: 'assets/imgs/me.webp',
        fileType: "images",
        open: false
    },
]

export const WINDOWS_APP_VIEWS: AppViews[] = [
    { optName: 'Grandi Icone', isOptSeleted: false, img: "assets/icons/big_img_size.webp" },
    { optName: 'Contenuto', isOptSeleted: true, img: 'assets/icons/img_size_list.webp' }
];