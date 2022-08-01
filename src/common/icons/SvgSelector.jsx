const SvgSelector = (props) => {
    switch (props.id) {
        case 'arrowsDown':
            return (
                <svg className={props.id} width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 0.585938L5.24264 4.82858L9.48528 0.585938" stroke="#344767" />
                </svg>
            )
        case 'backIcon':
            return (
                <svg className={props.id} width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.9987 6.00071H3.13972L6.76939 1.64111C6.93912 1.43691 7.02077 1.17365 6.99639 0.909247C6.97201 0.644844 6.8436 0.400955 6.6394 0.231232C6.43521 0.0615082 6.17195 -0.0201464 5.90755 0.00423112C5.64314 0.0286087 5.39925 0.157022 5.22953 0.36122L0.229979 6.36068C0.196343 6.4084 0.166264 6.45853 0.139987 6.51067C0.139987 6.56066 0.139988 6.59066 0.0699939 6.64066C0.0246714 6.75531 0.000941037 6.87735 0 7.00063C0.000941037 7.1239 0.0246714 7.24594 0.0699939 7.36059C0.0699939 7.41059 0.0699936 7.44059 0.139987 7.49058C0.166264 7.54272 0.196343 7.59285 0.229979 7.64057L5.22953 13.64C5.32354 13.7529 5.44127 13.8437 5.57435 13.9059C5.70742 13.9681 5.85256 14.0002 5.99946 14C6.23309 14.0005 6.45951 13.9191 6.6394 13.77C6.74065 13.6861 6.82435 13.583 6.88569 13.4666C6.94704 13.3503 6.98483 13.223 6.99691 13.0921C7.00898 12.9611 6.9951 12.829 6.95606 12.7034C6.91702 12.5778 6.85359 12.4612 6.76939 12.3601L3.13972 8.00054H14.9987C15.2638 8.00054 15.5182 7.89519 15.7057 7.70767C15.8932 7.52015 15.9986 7.26582 15.9986 7.00063C15.9986 6.73543 15.8932 6.4811 15.7057 6.29358C15.5182 6.10606 15.2638 6.00071 14.9987 6.00071Z" fill="#C8AC79" />
                </svg>
            )
        case 'check':
            return (
                <svg className={props.id} width="43" height="43" viewBox="0 0 43 43" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21.5295 0.254883C9.79848 0.254883 0.254517 9.79885 0.254517 21.5299C0.254517 33.2609 9.79848 42.8049 21.5295 42.8049C33.2606 42.8049 42.8045 33.2609 42.8045 21.5299C42.8045 9.79885 33.2606 0.254883 21.5295 0.254883ZM17.2766 30.9185L10.8823 24.538C10.051 23.7085 10.0493 22.3622 10.8786 21.5305C11.7084 20.6984 13.0557 20.6969 13.8874 21.5271L17.2724 24.9062L27.0312 15.1474C27.8619 14.3167 29.2088 14.3167 30.0395 15.1474C30.8702 15.9781 30.8702 17.325 30.0395 18.1557L17.2766 30.9185Z" fill="#CBAD73" />
                </svg>
            )
        case 'home':
            return (
                <svg className={props.id} width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.00008 0L11.3334 4V12H8.00008V7.33333H4.00008V12H0.666748V4L6.00008 0Z" fill="#020202" />
                </svg>

            )
        case 'downArrow':
            return (
                <svg className={props.id} width="19" height="10" viewBox="0 0 19 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 0.485352L9.48528 8.97063L17.9706 0.485352" stroke="#344767" />
                </svg>
            )
        case 'bell':
            return (
                <svg className={props.id} width="15" height="17" viewBox="0 0 15 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M6.43589 2.00569C4.1772 2.58661 2.50858 4.63602 2.50858 7.07684V10.5674C2.50858 10.8892 2.24727 11.1498 1.92742 11.1498C1.28434 11.1498 0.763184 11.6721 0.763184 12.3135C0.763184 12.9561 1.28508 13.477 1.92957 13.477H13.5603C14.2045 13.477 14.7267 12.9549 14.7267 12.3135C14.7267 11.6707 14.2031 11.1498 13.5624 11.1498C13.2414 11.1498 12.9813 10.8911 12.9813 10.5674V7.07684C12.9813 4.637 11.3129 2.58685 9.05395 2.00569V1.40461C9.05395 0.679699 8.46775 0.0952148 7.74481 0.0952148C7.02328 0.0952148 6.43585 0.681419 6.43585 1.40461L6.43589 2.00569ZM5.70859 14.059H9.7813C9.7813 15.1837 8.86947 16.0952 7.74485 16.0952C6.62024 16.0952 5.70865 15.1836 5.70865 14.059H5.70859Z" fill="#020202" />
                </svg>
            )
        case 'arrow':
            return (
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.48523 5.12598L5.24259 0.816698L0.999948 5.12598" stroke="#020202" />
                </svg>

            )
        case 'check-icon':
            return (
                <svg className={props.id} width="12" height="15" viewBox="0 0 12 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.95078 14.3187C6.07734 14.3187 6.26016 14.2694 6.44297 14.178C10.4648 12.1038 11.7937 11.014 11.7937 8.49678V3.2585C11.7937 2.44287 11.4773 2.14756 10.7883 1.85928C10.0219 1.54287 7.42734 0.621778 6.675 0.368653C6.45 0.298341 6.18984 0.249122 5.95078 0.249122C5.71875 0.249122 5.45859 0.305372 5.23359 0.368653C4.47422 0.607716 1.88672 1.54287 1.12031 1.85928C0.431251 2.14053 0.114844 2.44287 0.114844 3.2585V8.49678C0.114844 11.014 1.5 12.0054 5.46563 14.178C5.64844 14.2765 5.83125 14.3187 5.95078 14.3187ZM5.17031 10.4515C4.90313 10.4515 4.69219 10.339 4.48828 10.0788L2.76563 7.9835C2.63906 7.82881 2.57578 7.66006 2.57578 7.48428C2.57578 7.12568 2.86406 6.83037 3.22266 6.83037C3.44063 6.83037 3.60938 6.91475 3.79219 7.13975L5.14922 8.8624L8.05312 4.20772C8.20781 3.96865 8.40469 3.84209 8.62266 3.84209C8.97422 3.84209 9.29766 4.08818 9.29766 4.45381C9.29766 4.61553 9.21328 4.79131 9.11484 4.946L5.81719 10.0788C5.6625 10.3179 5.4375 10.4515 5.17031 10.4515Z" fill="#1C1C1E" />
                </svg>

            )
        case 'camera-icon':
            return (
                <svg className={props.id} width="17" height="14" viewBox="0 0 17 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.63944 8.47939C0.63944 9.75569 1.30741 10.4177 2.59563 10.4177H2.88787V6.21307C2.88787 4.45368 3.9435 3.40998 5.71481 3.40998H6.54381C6.68694 3.40998 6.72869 3.39209 6.82411 3.2907L7.25949 2.87919C7.7545 2.40803 8.27933 2.18736 8.96519 2.18736H11.148C11.8458 2.18736 12.3885 2.40803 12.8716 2.89111L13.1579 3.17739C13.1996 3.2251 13.2533 3.27877 13.2891 3.29667V2.40207C13.2891 1.13173 12.6152 0.469727 11.3329 0.469727H2.59563C1.30741 0.469727 0.63944 1.12577 0.63944 2.40207V8.47939ZM5.71481 13.2506H14.3984C15.6926 13.2506 16.3546 12.5886 16.3546 11.3183V6.21307C16.3546 4.93677 15.6926 4.27476 14.3984 4.27476H13.5694C13.1221 4.27476 12.973 4.22705 12.7106 3.95867L12.2633 3.51137C11.9412 3.18931 11.6251 3.05811 11.148 3.05811H8.96519C8.48807 3.05811 8.18391 3.19528 7.85589 3.51137L7.37877 3.95867C7.11635 4.2032 6.99707 4.27476 6.54381 4.27476H5.71481C4.42062 4.27476 3.75861 4.93677 3.75861 6.21307V11.3183C3.75861 12.5886 4.42062 13.2506 5.71481 13.2506ZM10.0387 11.3779C8.45229 11.3779 7.17599 10.0956 7.17599 8.50921C7.17599 6.93471 8.45229 5.65245 10.0387 5.65245C11.6132 5.65245 12.8955 6.93471 12.8955 8.50921C12.8955 10.0956 11.6132 11.3779 10.0387 11.3779ZM13.6887 7.16134C13.307 7.16134 13.0028 6.85121 13.0028 6.47548C13.0028 6.09379 13.307 5.78366 13.6887 5.78366C14.0704 5.78366 14.3805 6.09379 14.3805 6.47548C14.3805 6.85121 14.0704 7.16134 13.6887 7.16134ZM10.0387 10.3342C11.0347 10.3342 11.8518 9.51712 11.8518 8.50921C11.8518 7.50725 11.0347 6.69019 10.0387 6.69019C9.0308 6.69019 8.21373 7.50725 8.21373 8.50921C8.21373 9.51712 9.0308 10.3342 10.0387 10.3342Z" fill="#1C1C1E" />
                </svg>

            )
        case 'card-icon':
            return (
                <svg className={props.id} width="16" height="11" viewBox="0 0 16 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.2603 0.153516H2.73975C1.41084 0.153516 0.721778 0.836426 0.721778 2.15303V2.70674H15.2782V2.15303C15.2782 0.836426 14.5892 0.153516 13.2603 0.153516ZM3.28731 8.84063C2.92432 8.84063 2.68438 8.59453 2.68438 8.25V7.11182C2.68438 6.76729 2.92432 6.52119 3.28731 6.52119H4.79463C5.15762 6.52119 5.39756 6.76729 5.39756 7.11182V8.25C5.39756 8.59453 5.15762 8.84063 4.79463 8.84063H3.28731ZM2.73975 10.8032H13.2603C14.5892 10.8032 15.2782 10.1142 15.2782 8.80371V4.14639H0.721778V8.80371C0.721778 10.1203 1.41084 10.8032 2.73975 10.8032Z" fill="#1C1C1E" />
                </svg>

            )
        case 'filter-icon':
            return (
                <svg className={props.id} width="20" height="12" viewBox="0 0 20 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 1C0 0.447715 0.447715 0 1 0H19C19.5523 0 20 0.447715 20 1C20 1.55228 19.5523 2 19 2H1C0.447716 2 0 1.55228 0 1Z" fill="#7B809A" />
                    <path d="M3 6C3 5.44772 3.44772 5 4 5H16C16.5523 5 17 5.44772 17 6C17 6.55228 16.5523 7 16 7H4C3.44772 7 3 6.55228 3 6Z" fill="#7B809A" />
                    <path d="M8 10C7.44772 10 7 10.4477 7 11C7 11.5523 7.44772 12 8 12H12C12.5523 12 13 11.5523 13 11C13 10.4477 12.5523 10 12 10H8Z" fill="#7B809A" />
                </svg>

            )
        case 'download-icon':
            return (
                <svg className={props.id} width="13" height="16" viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.04529 13.6622C0.542664 13.6622 0.180115 14.0412 0.180115 14.5521C0.180115 15.0629 0.542664 15.442 1.04529 15.442H11.93C12.4409 15.442 12.8116 15.0629 12.8116 14.5521C12.8116 14.0412 12.4409 13.6622 11.93 13.6622H6.68951C6.87079 13.6292 7.03558 13.5303 7.16742 13.3903L12.4326 8.1745C12.6304 7.97675 12.7292 7.75427 12.7292 7.51532C12.7292 7.00446 12.3585 6.63367 11.8641 6.63367C11.6086 6.63367 11.3779 6.74078 11.2131 6.90558L9.51575 8.57001L7.31573 10.9843L7.39813 9.25391V1.5827C7.39813 1.03888 7.02734 0.668091 6.5 0.668091C5.96442 0.668091 5.59363 1.03888 5.59363 1.5827V9.25391L5.67603 10.9925L3.47601 8.57001L1.78687 6.90558C1.61383 6.73254 1.39136 6.63367 1.13593 6.63367C0.633301 6.63367 0.270752 7.00446 0.270752 7.51532C0.270752 7.75427 0.361389 7.97675 0.559143 8.1745L5.82434 13.3903C5.95618 13.5303 6.12097 13.6292 6.30225 13.6622H1.04529Z" fill="#7B809A" />
                </svg>

            )
        case 'down-arrow-icon':
            return (
                <svg className={props.id} width="11" height="12" viewBox="0 0 11 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.5 0.0341455C5.1183 0.0341455 4.84992 0.302526 4.84992 0.69615V8.10345L4.89764 9.39167L3.32314 7.63229L1.96931 6.29635C1.85599 6.18304 1.689 6.1055 1.51008 6.1055C1.15224 6.1055 0.883859 6.37985 0.883859 6.74365C0.883859 6.91661 0.949463 7.07167 1.08664 7.21481L5.01692 11.1511C5.14812 11.2823 5.32108 11.3598 5.5 11.3598C5.67892 11.3598 5.85188 11.2823 5.98308 11.1511L9.91336 7.21481C10.0505 7.07167 10.1161 6.91661 10.1161 6.74365C10.1161 6.37985 9.85372 6.1055 9.49588 6.1055C9.311 6.1055 9.14997 6.18304 9.03069 6.29635L7.67686 7.63229L6.10236 9.38571L6.15008 8.10345V0.69615C6.15008 0.302526 5.88766 0.0341455 5.5 0.0341455Z" fill="#7B809A" />
                </svg>

            )
        case 'go-back-icon':
            return (
                <svg className={props.id} width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M16.4167 5.92494H4.03082L7.55116 2.16992C7.96916 1.72407 7.96916 1.0034 7.55116 0.557538C7.13317 0.11168 6.45754 0.11168 6.03954 0.557538L0.694355 6.25904C0.276361 6.7049 0.276361 7.42557 0.694355 7.87143L6.03954 13.5729C6.24801 13.7953 6.52168 13.907 6.79535 13.907C7.06903 13.907 7.3427 13.7953 7.55116 13.5729C7.96916 13.1271 7.96916 12.4064 7.55116 11.9606L4.03082 8.20554H16.4167C17.0079 8.20554 17.4857 7.69468 17.4857 7.06524C17.4857 6.43579 17.0079 5.92494 16.4167 5.92494Z" fill="#414141" fillOpacity="0.4" />
                </svg>

            )
        case 'search-icon':
            return (
                <svg className={props.id} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.3833 12.877C7.76953 12.877 9.04785 12.4287 10.0938 11.6816L14.0283 15.6162C14.2109 15.7988 14.4517 15.8901 14.709 15.8901C15.2485 15.8901 15.6304 15.4751 15.6304 14.9438C15.6304 14.6948 15.5474 14.4541 15.3647 14.2798L11.4551 10.3618C12.2769 9.28271 12.7666 7.94629 12.7666 6.49365C12.7666 2.98242 9.89453 0.110352 6.3833 0.110352C2.88037 0.110352 0 2.97412 0 6.49365C0 10.0049 2.87207 12.877 6.3833 12.877ZM6.3833 11.499C3.64404 11.499 1.37793 9.23291 1.37793 6.49365C1.37793 3.75439 3.64404 1.48828 6.3833 1.48828C9.12256 1.48828 11.3887 3.75439 11.3887 6.49365C11.3887 9.23291 9.12256 11.499 6.3833 11.499Z" fill="#8E8E93" />
                </svg>

            )
        case 'sort-icon':
            return (
                <svg className={props.id} width="22" height="18" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.22559 0.603516L0.795898 5.12988C0.620117 5.31445 0.505859 5.57812 0.505859 5.81543C0.505859 6.36035 0.883789 6.72949 1.41992 6.72949C1.68359 6.72949 1.89453 6.6416 2.06152 6.46582L3.88086 4.58496L5.05859 3.22266L4.98828 5.10352V16.0898C4.98828 16.6348 5.375 17.0215 5.91113 17.0215C6.44727 17.0215 6.83398 16.6348 6.83398 16.0898V5.10352L6.76367 3.22266L7.9502 4.58496L9.76074 6.46582C9.92773 6.6416 10.1475 6.72949 10.4023 6.72949C10.9385 6.72949 11.3164 6.36035 11.3164 5.81543C11.3164 5.57812 11.2109 5.31445 11.0264 5.12988L6.60547 0.603516C6.21875 0.199219 5.6123 0.19043 5.22559 0.603516ZM16.7744 16.7227L21.2041 12.1787C21.3799 12.0029 21.4941 11.7393 21.4941 11.502C21.4941 10.957 21.1162 10.5879 20.5801 10.5879C20.3164 10.5879 20.1055 10.6758 19.9297 10.8516L18.1191 12.7236L16.9414 14.0947L17.0117 12.2139V1.22754C17.0117 0.691406 16.625 0.295898 16.0889 0.295898C15.5527 0.295898 15.1572 0.691406 15.1572 1.22754V12.2139L15.2275 14.0947L14.0498 12.7236L12.2393 10.8516C12.0635 10.6758 11.8525 10.5879 11.5977 10.5879C11.0615 10.5879 10.6836 10.957 10.6836 11.502C10.6836 11.7393 10.7891 12.0029 10.9648 12.1787L15.3945 16.7227C15.7812 17.1182 16.3877 17.127 16.7744 16.7227Z" fill="#8E8E93" />
                </svg>

            )
        case 'cross-icon':
            return (
                <svg className={props.id} width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.18848 13.0508C0.819336 13.4199 0.801758 14.0791 1.19727 14.4658C1.58398 14.8525 2.24316 14.8438 2.6123 14.4746L7.99121 9.08691L13.3789 14.4746C13.7568 14.8525 14.4072 14.8525 14.7939 14.4658C15.1719 14.0703 15.1807 13.4287 14.7939 13.0508L9.41504 7.66309L14.7939 2.28418C15.1807 1.90625 15.1807 1.25586 14.7939 0.869141C14.3984 0.491211 13.7568 0.482422 13.3789 0.860352L7.99121 6.24805L2.6123 0.860352C2.24316 0.491211 1.5752 0.473633 1.19727 0.869141C0.810547 1.25586 0.819336 1.91504 1.18848 2.28418L6.57617 7.66309L1.18848 13.0508Z" fill="#1C1C1E" />
                </svg>
            )
        case 'yellow-arrow-icon':
            return (
                <svg className={props.id} width="8" height="15" viewBox="0 0 8 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.20703 1L0.999843 7.51696L7.36776 13.8849" stroke="#CBAD73"/>
</svg>

            )    
        default:
            return (<svg></svg>)
    }
}

export default SvgSelector
