import {Divider, Group, ThemeIcon, Title} from "@mantine/core";
import {IconFolder} from "@tabler/icons-react";

function AppHeader() {
  return (
    <Group>
      <ThemeIcon variant="transparent" radius="sm" size="sm">
        <IconFolder />
      </ThemeIcon>
      <Divider orientation="vertical" />
      <Title order={6} fw={500}>
        Subler - Unified explorer
      </Title>
    </Group>
  );
}

export default AppHeader;
