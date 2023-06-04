import { createStyles, Header, Container, Group, MediaQuery } from '@mantine/core';
import Link from 'next/link';

const HEADER_HEIGHT = 60;

const useStyles = createStyles((theme) => ({
  headerHolder: {
    borderBottom: '0px',
    position: 'fixed',
    backgroundColor: 'rgba(0,0,0,0)',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
  },
  titleHolder: {
    display: 'flex',
    justifyContent: 'center',
    userSelect: 'none'
  }
}));

export function Navbar() {
  const { classes, cx } = useStyles();

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