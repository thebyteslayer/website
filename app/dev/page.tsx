import Button from "../../components/button";
import ThemeSwitch from "../../components/themeSwitch";

export default function Page() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        gap: "20px",
        background: "transparent",
      }}
    >
      <Button>Default</Button>
      <Button
        color="inverted"
      >
        Inverted
      </Button>
      <Button
        effects={["highlight"]}
      >
        Highlight
      </Button>
      <Button
        effects={["shrink"]}
      >
        Shrink
      </Button>
      <Button
        effects={["highlight", "shrink"]}
      >
        Highlight + Shrink
      </Button>
      <Button
        color="inverted"
        effects={["highlight"]}
      >
        Inverted + Highlight
      </Button>
      <Button
        color="inverted"
        effects={["shrink"]}
      >
        Inverted + Shrink
      </Button>
      <Button
        color="inverted"
        effects={["highlight", "shrink"]}
      >
        Inverted + Highlight + Shrink
      </Button>
      <ThemeSwitch />
    </div>
  );
}
