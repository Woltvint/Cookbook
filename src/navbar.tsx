import { useState } from 'react';
import { createStyles, Header, Container, Group, Burger, Paper, Transition, keyframes, MediaQuery } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Image from 'next/image';
import Link from 'next/link';


const HEADER_HEIGHT = 60;

const useStyles = createStyles((theme) => ({
  headerHolder: {
    borderBottom: '0px',
    position: 'fixed',
    backgroundColor: 'rgba(26,27,30,0.0)',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
  },

  links: {
    
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  burger: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    [theme.fn.largerThan('sm')]: {
      display: 'none',
      
    },
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: '8px 16px',
    marginLeft: '-4px',
    marginRight: '-4px',
    textDecoration: 'none',
    color: 'rgba(255,255,255,1.0)',
    backgroundColor: 'rgba(0,0,0,0.3)',
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,
    borderRadius: '5px',

    '&:hover': {
      backgroundColor: 'rgba(0,0,0,0.4)',
    },
    
  },

  linkActive: {
    '&, &:hover': {
      backgroundColor: 'rgba(0,0,0,0.4)',
      color: 'rgba(255,255,255,1.0)',
    },
  },
  dropdown: {
    position: 'fixed',
    top: HEADER_HEIGHT,
    left: 0,
    right: 0,
    /*borderTopRightRadius: 0,
    borderTopLeftRadius: 0,*/
    borderWidth: 0,
    overflow: 'hidden',
    backgroundColor: 'rgba(26,27,30,0.0)',
    textAlign: 'center',
    

    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },



  },
  title: {
    display: 'block',
    color: 'white',
    fontSize: 30,
    [theme.fn.smallerThan('xs')]: {
      display: 'none',
    }
  },
  titleHolder: {
    display: 'flex',
    justifyContent: 'center',
    userSelect: 'none'
  }
}));

interface NavbarProps {
  links: { link: string; label: string }[];
}

export function Navbar(/*{ links }: NavbarProps*/) {
  const [opened, { toggle }] = useDisclosure(false);
  //const [active, setActive] = useState(links[0].link);
  const { classes, cx } = useStyles();

  /*const items = links.map((link) => (
    <Link href={link.link} key={link.label} className={cx(classes.link, { [classes.linkActive]: active === link.link })} onClick={(event) => {
      toggle();
      setActive(link.link);
    }}>
      {link.label}
    </Link>
  ));*/

  return (
    <MediaQuery query='print' styles={{display: 'none'}}>
      <Header height={HEADER_HEIGHT} className={classes.headerHolder}>
        <Container className={classes.header}>
          <Link href='/'>
          <Group className={classes.titleHolder} spacing={0}>
              <h1 style={{color: "#e74646", fontSize: "50px", textShadow: "#333333 0px 0px 10px"}}>Cookbook</h1>
          </Group>
          </Link>
        </Container>
      </Header>
    </MediaQuery>
  );
}