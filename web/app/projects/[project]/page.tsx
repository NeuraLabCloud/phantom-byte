"use client";

import React from 'react';
import { Button, Center, Text, Title } from "@mantine/core";
import { IconFileSpreadsheet, IconChartArrows } from '@tabler/icons-react';

import LogsLoader from '../../../components/ui/logsViews/index.tsx';

type ViewNames = 'List' | 'Analytics';
interface ReducerAction {
  type: 'setLogsView', value: ViewNames
}
interface ReducerState {
  currentViewName: ViewNames
}
const reducer = (state: ReducerState, action: ReducerAction) => {
  switch (action.type) {
    case 'setLogsView': {
      return { currentViewName: action.value };
    };
    default: {
      throw Error(`(in projects' reducer) Unknown action: ${action.type}`);
    }
  }
}

export default function Projects() {
  //   const auth = useAuth()?.isAuthenticated;
  const [state, dispatch] = React.useReducer(reducer, { currentViewName: 'List' });

  const viewsButtons:{IconComponent: React.FC, name:ViewNames}[] = [
    { IconComponent: IconFileSpreadsheet, name: 'List' },
    { IconComponent: IconChartArrows, name: 'Analytics' }
  ]

  return (
    <main className="flex h-[100vh] w-[100vw] p-4">
      <div aria-label="main view" className="grow">
        <LogsLoader
          logsViewName={state.currentViewName}
          />
      </div>
      <aside className="max-w-3 flex flex-col">
        {viewsButtons.map(({ IconComponent, name }) => {
          return <Button
            className={`${state.currentViewName == name ? 'text-primary' : ''}`}

            onClick={() => { dispatch({ type: 'setLogsView', value: name }) }}
          >
            <IconComponent />
          </Button>
        })}
      </aside>
    </main>
  );
}
