// @ts-nocheck
// const authMiddleware = ()

const printIfAuthenticated = (text: string) => {
    // console.log('You are authenticated', text);
    return `You are authenticated, ${text}`
}

const authMiddleWare = () => {
    const randInt = Math.floor(Math.random() * 2);

    if (randInt === 1) {
        return true;
    }
}

const use = (fn: Function, next?: Function) => {
    // if fn returns something truthy then call next, otherwise do nothing
    const result = fn();
    if (result) {
        return next?.();
    }
}


const t = use(authMiddleWare, () => printIfAuthenticated('Hello'));
// console.log({ t });

async function main() {
    const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    let button = document.querySelector('.UnstyledLink.Button-element.PressableContext.Padding-horizontal--8.Padding-vertical--4.PressableContext--cursor--pointer.PressableContext--display--inlineFlex.PressableContext--fontLineHeight--16.PressableContext--fontSize--13.PressableContext--fontWeight--medium')

    while (button) {
        button.click();

        await wait(300);

        const deleteButton = document.querySelector('#' + button.id.split('-')[0] + ' > div > div:nth-child(3) > div > button')
        deleteButton.click();

        await wait(1000);

        const deleteConfirmButton = document.querySelector('#merch > div:nth-child(36) > div:nth-child(2) > div > span.ModalLayer-container > div > div > div > div > div.Dialog-footer.Box-root.Box-divider--light-top-1.Padding-top--16.Padding-bottom--16.Padding-horizontal--20.Flex-flex.Flex-direction--row.Flex-justifyContent--flexEnd > div > div > div > div:nth-child(2) > div > div.PressableCore-base.Box-root > button')
        deleteConfirmButton.click();

        await wait(7000);

        button = document.querySelector('.UnstyledLink.Button-element.PressableContext.Padding-horizontal--8.Padding-vertical--4.PressableContext--cursor--pointer.PressableContext--display--inlineFlex.PressableContext--fontLineHeight--16.PressableContext--fontSize--13.PressableContext--fontWeight--medium')
    }
}
