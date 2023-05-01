import React, { useEffect, useState } from 'react';
import { useStores } from '../../hooks/useStores';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react';
import './styles.css'
import { Button } from 'antd';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import MDEditor from '@uiw/react-md-editor';

const ProjectWikiPage: React.FC = () => {
  const {projectId, wikiPageId} = useParams();
  const {projectWikiPageStore} = useStores();
  const [isEditContentMode, setEditContentMode] = useState(false);

  useEffect(() => {
    projectWikiPageStore.fetch(parseInt(projectId!), parseInt(wikiPageId!))
  }, [])

  const changeContentHandle = (value?: string) => {
    projectWikiPageStore.content = value
  }

  return (
    <div className="ProjectWikiPage">
      <div className="ProjectWikiPage__toolbar">
        <div className="ProjectWikiPage__title">
          {projectWikiPageStore.title}
        </div>
        <div className="ProjectWikiPage__actions">
          <Button className="ProjectWikiPage__actions_button">Изменить название</Button>
          {!isEditContentMode ? 
            <Button 
              className="ProjectWikiPage__actions_button" 
              onClick={() => {
                setEditContentMode(true);
              }}
            >
              Изменить содержимое
            </Button> : 
            <Button 
              className="ProjectWikiPage__actions_button" 
              onClick={() => {setEditContentMode(false)}}
            >
              Сохранить
            </Button>
          }
        </div>
      </div>
      {!isEditContentMode 
          ? (
            <ReactMarkdown 
              className="ProjectWikiPage__markdown" 
              children={projectWikiPageStore.content ?? ''} 
            />
          ) 
          : (
            <MDEditor
              className="ProjectWikiPage__editor" 
              data-color-mode='light'
              height="100%"
              value={projectWikiPageStore.content} 
              onChange={changeContentHandle}
            />
          )
      }
    </div>
  )
}

export default observer(ProjectWikiPage);