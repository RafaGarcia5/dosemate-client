import '../styles/Navbar.css';
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { NavLink } from 'react-router';
import { AppBar, Toolbar, IconButton, Button, Drawer, List, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import MenuIcon from '@mui/icons-material/Menu';

export default function Navbar({ role = 'patient' }) {
    const { t } = useTranslation('navbar');
    const { user, handleLogout } = useAuth();
    const [drawerOpen, setDrawerOpen] = useState(false);

    const patientLinks = [
        { text: t('mainPage'), to: 'mainPage' },
        { text: t('schedule'), to: 'schedule' },
        { text: t('treatment'), to: 'treatment' },
        { text: t('caregivers'), to: 'caregiverList' },
        { text: t('profile'), to: 'profile' },
    ];

    const caregiverLinks = [
        { text: t('mainPage'), to: 'mainPage' },
        { text: t('patients'), to: 'patientList' },
        { text: t('profile'), to: 'profile' },
    ];

    const links = role === 'patient' ? patientLinks : caregiverLinks;

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    const drawer = (
        <Box
            className='drawer-box-container'
            role='presentation'
            onClick={toggleDrawer}
            onKeyDown={toggleDrawer}
        >
            <List>
                {links.map(({ text, to }) => (
                    <NavLink
                        key={text}
                        to={to}
                        className={({ isActive }) => `nav-link drawer-link ${isActive ? 'active' : ''}`}
                    >
                        {text}
                    </NavLink>
                ))}
                <Button
                    onClick={handleLogout}
                    className="nav-link drawer-link logout-link"
                >
                    { t('logout') }
                </Button>
            </List>
        </Box>
    );

    return (
        <>
            <AppBar position='static' className='appBar-container' elevation={1}>
                <Toolbar>
                    <IconButton
                        edge='start'
                        color='inherit'
                        aria-label='menu'
                        onClick={toggleDrawer}
                        className='menu-icon'
                    >
                        <MenuIcon />
                    </IconButton>

                    <p className='user-message'>
                        ID: {user?.id} - { t('greeting') }, {user?.name}
                    </p>

                    <Box className='appBar-box-container' >
                        {links.map(({ text, to }) => (
                            <NavLink 
                                key={text} 
                                to={to} 
                                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                            >
                                {text}
                            </NavLink>
                        ))}

                        <Button onClick={handleLogout} variant='contained'>
                            { t('logout') }
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>

            <Drawer
                anchor='left'
                open={drawerOpen}
                onClose={toggleDrawer}
                ModalProps={{
                    keepMounted: true,
                }}
            >
                {drawer}
            </Drawer>
        </>
    );
}
