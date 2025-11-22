export const AceNavbar = {
    template: `
        <nav class="ace-navbar">
            <slot>
                <div class="ace-navbar-body">
                    <div left>
                        <slot name="left"></slot>
                    </div>
                    <div center>
                        <slot name="center"></slot>
                    </div>
                    <div right>
                        <slot name="right"></slot>
                    </div>
                </div>
            </slot>
        </nav>
    `
};