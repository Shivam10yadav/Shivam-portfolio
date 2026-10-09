import React, { useEffect, useState } from "react";
import ContributionSkyline from "./ContributionSkyline";

export default function GithubActivity({ username = "Shivam10yadav" }) {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState("loading"); // loading | ready | error
  const [view, setView] = useState("2d"); // starts flat

  useEffect(() => {
    let cancelled = false;
    setStatus("loading");
    fetch(
      `https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(
        username
      )}?y=last`
    )
      .then((res) => {
        if (!res.ok) throw new Error("Request failed: " + res.status);
        return res.json();
      })
      .then((json) => {
        if (cancelled) return;
        setData(
          (json.contributions || []).map((d) => ({
            date: d.date,
            count: d.count,
          }))
        );
        setStatus("ready");
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });
    return () => {
      cancelled = true;
    };
  }, [username]);

  if (status === "loading") {
    return (
      <div className="h-64 w-full animate-pulse rounded-xl border border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900" />
    );
  }

  if (status === "error") {
    return (
      <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 p-6 text-sm text-neutral-500 dark:text-neutral-400">
        Couldn't load GitHub activity right now.{" "}
        <a
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noreferrer"
          className="font-medium text-neutral-900 dark:text-white underline"
        >
          View my GitHub profile →
        </a>
      </div>
    );
  }

  return (
    <div
      onMouseEnter={() => setView("3d")}
      onMouseLeave={() => setView("2d")}
    >
      <ContributionSkyline
        data={data}
        palette="mono"
        view={view}
        onViewChange={setView}
        heightScale={0.85}
        footer={
          view === "3d"
            ? "Drag to orbit · double-click to reset"
            : "Hover to raise the skyline"
        }
        className="!p-6 sm:!p-8 [--color-background:#ffffff] dark:[--color-background:#0a0a0a] [--color-foreground:#0a0a0a] dark:[--color-foreground:#ffffff] [--color-border:#e5e5e5] dark:[--color-border:#262626] [--color-muted-foreground:#737373]"
      />
    </div>
  );
}