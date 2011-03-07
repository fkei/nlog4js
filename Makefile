RPMBUILDFLAGS+= \
  --define="_topdir ${PWD}" \
  --define="_sourcedir ${PWD}" \
  --define="_rpmdir ${PWD}/RPMS" \
  --define="_srcrpmdir ${PWD}/SRPMS" \
  --define="__check_files %{nil}" \
  --define="__debug_install_post %{nil}" \
  #--define="builddate `date +%Y%m%d%H%M%S`" \

PROJECTNAME="nlog4js"
DESC="node.js module - wrap log4js"


all: test doc pkg

pkg:
	echo "TODO package(tar.gz)"

test:
	nodeunit test

doc: doxdoc jsdoc

doxdoc:
	mkdir -p dist/doxdoc
	dox --title $(PROJECTNAME) --desc $(DESC) $(file lib/*.js) > dist/doxdoc/nlog4js

jsdoc:
	# Please install extra jsdoc-toolkit.
	mkdir -p dist/jsdoc
	java -jar deps/jsdoc-toolkit/jsrun.jar deps/jsdoc-toolkit/app/run.js --directory=dist/jsdoc -a -p -P -t=deps/jsdoc-toolkit/templates/jsdoc lib/*.js

clean:
	rm -rf dist

help:
	@echo "all, pkg, test, doc, doxdoc, jsdoc, clean, help"

.PHONY: all pkg test doc doxdoc jsdoc clean help

