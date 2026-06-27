"use client";

import * as React from "react";
import { Search } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function SearchModal() {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full w-9 h-9 text-muted-foreground hover:text-foreground">
          <Search className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Search</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] top-[20%] translate-y-[-20%]">
        <DialogHeader>
          <DialogTitle className="sr-only">Search</DialogTitle>
        </DialogHeader>
        <div className="flex items-center border-b px-3 pb-3 pt-2">
          <Search className="mr-2 h-5 w-5 shrink-0 opacity-50" />
          <Input
            placeholder="Search news, topics, or authors..."
            className="flex h-12 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground border-none shadow-none focus-visible:ring-0"
          />
        </div>
        <div className="px-4 py-6">
          <p className="text-sm text-muted-foreground text-center">
            Start typing to search.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
