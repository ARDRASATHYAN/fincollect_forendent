"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HiDotsVertical } from "react-icons/hi";

/**
 * ActionDropdown supporting submenus without radio buttons
 */
export function ActionDropdown({ actions = [], onAction, className = "" }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
       
          aria-label="More Options"
          className="border border-gray-300 rounded p-1 hover:bg-gray-100 focus:outline-none"
        >
         <HiDotsVertical />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-52">
        {actions.map((group, groupIndex) => (
          <React.Fragment key={`group-${groupIndex}`}>
            {groupIndex > 0 && <DropdownMenuSeparator />}
            <DropdownMenuGroup>
              {group.items.map((item, itemIndex) =>
                item.submenu ? (
                  <DropdownMenuSub
                    key={`group-${groupIndex}-item-${itemIndex}`}
                  >
                    <DropdownMenuSubTrigger>
                      {item.icon && <item.icon />} {item.label}
                    </DropdownMenuSubTrigger>
                    <DropdownMenuSubContent>
                      {item.submenu.map((sub, subIndex) => (
                        <DropdownMenuItem
                          key={`group-${groupIndex}-item-${itemIndex}-sub-${subIndex}`}
                          onClick={() => onAction?.(sub.value)}
                          className={sub.destructive ? "text-red-600" : ""}
                        >
                          {sub.icon && <sub.icon />} {sub.label}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuSubContent>
                  </DropdownMenuSub>
                ) : (
                  <DropdownMenuItem
                    key={`group-${groupIndex}-item-${itemIndex}`}
                    onClick={() => onAction?.(item.value)}
                    className={item.destructive ? "text-red-600" : ""}
                  >
                    {item.icon && <item.icon />} {item.label}
                  </DropdownMenuItem>
                )
              )}
            </DropdownMenuGroup>
          </React.Fragment>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
