# ShopMCP Adapter

ShopMCP is the live-data execution layer for these playbooks.

Suggested prompt pattern:

```text
Run the [playbook title] play for [date window]. Keep it read-only.
```

ShopMCP should only write to connected systems when the specific tool supports approved writes and the operator confirms the preview.
