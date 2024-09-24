import { Body, Container, Head, Html, Tailwind } from '@react-email/components';
import * as React from 'react';


export const Layout = ({ children }: { children: React.ReactNode }) => {

    return (
        <Html>
            <Tailwind>
                <Head />
                <Body>
                    <Container className="bg-gray-100 p-4 max-w-[800px]">
                        {children}
                    </Container>
                </Body>
            </Tailwind>
        </Html>

    )
}