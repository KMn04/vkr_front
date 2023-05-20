import React, { useEffect, useState } from 'react';
import { useStores } from '../../hooks/useStores';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react';
import './styles.css'
import { Button, Input } from 'antd';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import MDEditor from '@uiw/react-md-editor';

const ProjectWikiPage: React.FC = () => {
  const {projectId, wikiPageId} = useParams();
  const {projectWikiPageStore} = useStores();
  const [isEditContentMode, setEditContentMode] = useState(false);
  const [isEditTitleMode, setEditTitleMode] = useState(false);

  useEffect(() => {
    projectWikiPageStore.fetch(parseInt(projectId!), wikiPageId!)
  }, [wikiPageId])

  const changeTitleHandle = (event: React.ChangeEvent<HTMLInputElement>) => {
    projectWikiPageStore.tempTitle = event.target.value
  }

  const changeContentHandle = (value?: string) => {
    projectWikiPageStore.tempContent = value
  }

  if(projectWikiPageStore.state.isLoading){
    return (<span>Загрузка страницы базы знаний...</span>)
  }

  return (
    <div className="ProjectWikiPage">
      <div className="ProjectWikiPage__toolbar">
        <div className="ProjectWikiPage__title">
          {!isEditTitleMode ? projectWikiPageStore.title : (
            <Input 
              value={projectWikiPageStore.tempTitle} 
              onChange={changeTitleHandle} 
            />
          )}
        </div>
        <div className="ProjectWikiPage__actions">
          {!isEditTitleMode ? 
            <Button 
              className="ProjectWikiPage__actions_button"
              onClick={() => {
                setEditTitleMode(true)
              }}  
            >
              Изменить название
            </Button>: 
            <Button 
              className="ProjectWikiPage__actions_button"
              onClick={async () => {
                await projectWikiPageStore.updateTitle()
                setEditTitleMode(false)
              }}  
            >
              Сохранить название
            </Button>
            }
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
              onClick={async () => {
                await projectWikiPageStore.updateContent()
                setEditContentMode(false)
              }}
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
              value={projectWikiPageStore.tempContent} 
              onChange={changeContentHandle}
            />
          )
      }
    </div>
  )
}

export default observer(ProjectWikiPage);